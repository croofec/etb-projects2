// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./utils/IBEP20/IBEP20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ETBStaking is Ownable {
    using SafeMath for uint256;

    struct StakerInfo {
        uint256 _depositTime;
        uint256 _amount;
    }

    struct StakingStage {
        uint256 _reward;
        uint256 _startTime;
        uint256 _endTime;
        uint256 _duration;
    }

    event Stake(
        uint256 indexed _stage,
        address indexed _user,
        uint256 indexed _amount
    );

    event StakingStageCreated(
        uint256 indexed _stage,
        uint256 indexed _reward,
        uint256 indexed _duration
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

    StakingStage[] private _stakingStages;

    mapping(uint256 => mapping(address => StakerInfo)) _stagesStakeHolders;

    constructor(
        address tokenForStaking,
        address rewardToken) {
        _tokenForStaking = tokenForStaking;
        _rewardToken = rewardToken;
    }

    function addStakeStage(uint256 reward, uint256 duration) external onlyOwner {
        require(reward > 0, "ETBStaking: reward must be > 0");
        require(duration > 0, "ETBStaking: duration must be > 0");
        require(IBEP20(_rewardToken).balanceOf(msg.sender) >= reward, 'ETBStaking: not enough required BEP20 token');

        IBEP20(_rewardToken).transferFrom(
            address(msg.sender),
            address(this),
            reward
        );

        _stakingStages.push(StakingStage({
            _reward : reward,
            _startTime : block.timestamp,
            _endTime : block.timestamp + duration,
            _duration : duration
            }));

        emit StakingStageCreated(
            _stakingStages.length,
            reward,
            duration
        );
    }

    function stake(uint256 stage, uint256 value) external {
        require(stage < _stakingStages.length, 'ETBStaking: wrong number of stage');
        require(block.timestamp > _stakingStages[stage]._startTime, 'ETBStaking: staking not stared yet');
        require(block.timestamp <= _stakingStages[stage]._endTime, 'ETBStaking: staking ended');
        require(IBEP20(_tokenForStaking).balanceOf(msg.sender) >= value, 'ETBStaking: not enough required BEP20 token');

        StakerInfo storage stakeHolder = _stagesStakeHolders[stage][msg.sender];
        require(stakeHolder._depositTime == 0, "ETBStaking: User already in staking pool");

        IBEP20(_tokenForStaking).transferFrom(
            address(msg.sender),
            address(this),
            value
        );

        stakeHolder._depositTime = block.timestamp;
        stakeHolder._amount += value;

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
        StakerInfo storage stakeHolder = _stagesStakeHolders[stage][msg.sender];
        require(stakeHolder._depositTime > 0, "ETBStaking: Not stakeholder");
        require(stakeHolder._amount > 0, "ETBStaking: User already withdrawn");

        uint256 value = stakeHolder._amount;
        uint256 reward = _calculateReward(stage, msg.sender);

        IBEP20(_tokenForStaking).transfer(address(msg.sender), value);
        IBEP20(_rewardToken).transfer(address(msg.sender), reward);

        uint256 depositTime = stakeHolder._depositTime;

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

    function getReward(uint256 stage, address staker) external view returns (uint256) {
        return _calculateReward(stage, staker);
    }

    function _calculateReward(uint256 stage, address stakerAddress) internal view returns (uint256) {
        require(stage < _stakingStages.length, 'ETBStaking: wrong number of stage');
        StakerInfo storage staker = _stagesStakeHolders[stage][stakerAddress];
        //FIXME
        return 0;
    }

    function isStackingStageIsActive(uint256 stage) external view returns (bool) {
        require(stage < _stakingStages.length, 'ETBStaking: wrong number of stage');
        return block.timestamp > _stakingStages[stage]._startTime && block.timestamp <= _stakingStages[stage]._endTime;
    }

    function getStackingStagesLength() external view returns (uint256) {
        return _stakingStages.length;
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