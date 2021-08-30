// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ETBStaking is Context, Ownable {
    using SafeMath for uint256;

    address internal _tokenForStaking;
    address internal _rewardToken;

    constructor(
        address tokenForStaking,
        address rewardToken) {
        _tokenForStaking = tokenForStaking;
        _rewardToken = rewardToken;
    }

    function setRewardToken(address rewardToken) external onlyOwner {
        _rewardToken = rewardToken;
    }

    function setSupportedToken(address supportedToken) external onlyOwner {
        require(supportedToken != address(0), 'ETBStaking: supportedToken can\'t be zero address');
        _tokenForStaking = supportedToken;
    }

    function getRewardToken () external view returns (address) {
        return _rewardToken;
    }

    function getSupportedToken() external view returns (address) {
        return _tokenForStaking;
    }

    function getOwner() external view returns (address) {
        return owner();
    }
}