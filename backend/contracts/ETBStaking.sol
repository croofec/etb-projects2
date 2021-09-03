// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./utils/IBEP20/IBEP20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ETBStaking is Ownable {
    using SafeMath for uint256;

    struct HolderInfo {
        uint256 _depositTime;
        uint256 _amount;
    }

    struct StakingStage {
        uint256 _reward;
        uint256 _startTime;
        uint256 _endTime;
        uint256 _tokens;
        uint256 _holders;
        uint256 _balance;
        uint256 _rewardPerDay;
    }

    event Stake(
        uint256 indexed _stage,
        address indexed _user,
        uint256 indexed _amount
    );

    event StakingStageCreated(
        uint256 indexed _stage,
        uint256 indexed _startTime,
        uint256 indexed _endTime,
        uint256 _reward
    );

    event Withdraw(
        uint256 indexed _stage,
        address indexed _user,
        uint256 indexed _amount,
        uint256 _reward,
        uint256 _depositTime
    );

    address internal _tokenForStaking;
    address internal _rewardToken;

    uint256 internal _daySeconds = 1 days;

    StakingStage[] private _stakingStages;

    mapping(uint256 => mapping(address => HolderInfo)) _stagesStakeHolders;

    constructor(
        address tokenForStaking,
        address rewardToken) {
        _tokenForStaking = tokenForStaking;
        _rewardToken = rewardToken;
    }

    function addStakeStage(uint256 reward, uint256 startTime, uint256 endTime) external onlyOwner {
        require(reward > 0, "ETBStaking: reward must be > 0");
        require(endTime > startTime, "ETBStaking: startTime must be less then endTIme");
        require(IBEP20(_rewardToken).balanceOf(msg.sender) >= reward, 'ETBStaking: not enough required BEP20 token');

        IBEP20(_rewardToken).transferFrom(
            address(msg.sender),
            address(this),
            reward
        );

        (, uint256 stakingDurationDays) = SafeMath.tryDiv(endTime - startTime, _daySeconds);
        (, uint256 rewardPerDay) = SafeMath.tryDiv(reward, stakingDurationDays);
        _stakingStages.push(StakingStage({
            _reward : reward,
            _startTime : startTime,
            _endTime : endTime,
            _tokens : 0,
            _holders : 0,
            _balance : reward,
            _rewardPerDay : rewardPerDay
            }));


        emit StakingStageCreated(
            _stakingStages.length,
            startTime,
            endTime,
            reward
        );
    }

    function stake(uint256 stage, uint256 value) external {
        require(value > 0, 'ETBStaking: stake must be > 0');
        require(stage < _stakingStages.length, 'ETBStaking: wrong number of stage');
        require(block.timestamp > _stakingStages[stage]._startTime, 'ETBStaking: staking not stared yet');
        require(block.timestamp <= _stakingStages[stage]._endTime, 'ETBStaking: staking ended');
        require(IBEP20(_tokenForStaking).balanceOf(msg.sender) >= value, 'ETBStaking: not enough required BEP20 token');
        HolderInfo storage stakeHolder = _stagesStakeHolders[stage][msg.sender];
        require(stakeHolder._depositTime == 0, "ETBStaking: User already in staking pool");

        IBEP20(_tokenForStaking).transferFrom(
            address(msg.sender),
            address(this),
            value
        );

        stakeHolder._depositTime = block.timestamp;
        stakeHolder._amount += value;

        _stakingStages[stage]._holders += 1;
        _stakingStages[stage]._tokens += value;

        emit Stake({
            _stage : stage,
            _user : msg.sender,
            _amount : value
            }
        );
    }

    function withdraw(uint256 stage) external {
        require(stage < _stakingStages.length, 'ETBStaking: wrong number of stage');
        require(block.timestamp > _stakingStages[stage]._startTime, 'ETBStaking: staking not stared yet');
        require(IBEP20(_rewardToken).balanceOf(address(this)) >= _calculateReward(stage, msg.sender), 'ETBStaking: not enough balance for reward BEP20 token');
        HolderInfo storage stakeHolder = _stagesStakeHolders[stage][msg.sender];
        require(stakeHolder._depositTime > 0, "ETBStaking: Not stakeholder");
        require(stakeHolder._amount > 0, "ETBStaking: User already withdrawn");

        uint256 value = stakeHolder._amount;
        uint256 reward = _calculateReward(stage, msg.sender);

        IBEP20(_tokenForStaking).transfer(address(msg.sender), value);
        IBEP20(_rewardToken).transfer(address(msg.sender), reward);

        uint256 depositTime = stakeHolder._depositTime;

        _stakingStages[stage]._holders -= 1;
        _stakingStages[stage]._tokens -= stakeHolder._amount;
        _stakingStages[stage]._balance -= reward;

        stakeHolder._depositTime = 0;
        stakeHolder._amount = 0;

        emit Withdraw({
            _stage : stage,
            _user : msg.sender,
            _amount : value,
            _reward : reward,
            _depositTime : depositTime
            });
    }

    function getReward(uint256 stage, address holderAddress) external view returns (uint256) {
        return _calculateReward(stage, holderAddress);
    }

    function _calculateReward(uint256 stage, address holderAddress) internal view returns (uint256) {
        require(stage < _stakingStages.length, 'ETBStaking: wrong number of stage');

        HolderInfo storage stakeHolder = _stagesStakeHolders[stage][holderAddress];
        require(stakeHolder._depositTime > 0, "ETBStaking: Not stakeholder");

        //max end time for reward
        uint256 current = Math.min(block.timestamp, _stakingStages[stage]._endTime);

        //duration of holding
        (,uint256  holderDurationDay) = SafeMath.tryDiv(current - stakeHolder._depositTime, _daySeconds);
        //poolWeight
        (,uint256  poolWeight) = SafeMath.tryDiv(stakeHolder._amount * 100, _stakingStages[stage]._tokens);

        //calc rewardPerDay * poolWeight
        (,uint256  rewardRate) = SafeMath.tryMul(_stakingStages[stage]._rewardPerDay, poolWeight);
        //bonus by days
        (,uint256  reward) = SafeMath.tryMul(holderDurationDay, rewardRate);
        (,uint256  result) = SafeMath.tryDiv(reward, 100);
        return result;
    }

    function isStackingStageIsActive(uint256 stage) external view returns (bool) {
        require(stage < _stakingStages.length, 'ETBStaking: wrong number of stage');
        return block.timestamp > _stakingStages[stage]._startTime && block.timestamp <= _stakingStages[stage]._endTime;
    }

    function getStackingStagesLength() external view returns (uint256) {
        return _stakingStages.length;
    }

    function getStackingStage(uint256 stage) external view returns (uint256, uint256, uint256, uint256, uint256, uint256, uint256) {
        require(stage < _stakingStages.length, 'ETBStaking: wrong number of stage');
        return (
        _stakingStages[stage]._reward,
        _stakingStages[stage]._startTime,
        _stakingStages[stage]._endTime,
        _stakingStages[stage]._tokens,
        _stakingStages[stage]._holders,
        _stakingStages[stage]._balance,
        _stakingStages[stage]._rewardPerDay
        );
    }

    function getHolderInfo(uint256 stage, address holderAddress) external view returns (uint256, uint256, uint256) {
        require(stage < _stakingStages.length, 'ETBStaking: wrong number of stage');
        HolderInfo storage holder = _stagesStakeHolders[stage][holderAddress];
        return (
        holder._depositTime,
        holder._amount,
        _calculateReward(stage, holderAddress)
        );
    }

    function setRewardToken(address rewardToken) external onlyOwner {
        require(rewardToken != address(0), 'ETBStaking: supportedToken can\'t be zero address');
        _rewardToken = rewardToken;
    }

    function setSupportedToken(address supportedToken) external onlyOwner {
        require(supportedToken != address(0), 'ETBStaking: supportedToken can\'t be zero address');
        _tokenForStaking = supportedToken;
    }

    function getRewardToken() external view returns (address) {
        return _rewardToken;
    }

    function getSupportedToken() external view returns (address) {
        return _tokenForStaking;
    }

    function getOwner() external view returns (address) {
        return owner();
    }

    function rescueBEP20(address token) external onlyOwner {
        uint256 amt = IBEP20(token).balanceOf(address(this));
        IBEP20(token).transfer(owner(), amt);
    }

    function rescue() external payable onlyOwner {
        address payable addressOwner = payable(address(owner()));
        addressOwner.transfer(address(this).balance);
    }
}