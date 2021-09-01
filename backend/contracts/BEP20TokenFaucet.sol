// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./utils/IBEP20/IBEP20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BEP20TokenFaucet is Ownable {
    using SafeMath for uint256;

    address internal _tokenAddress;

    constructor(address tokenAddress) {
        require(tokenAddress != address(0), 'BEP20TokenFaucet: must be != 0 address');
        _tokenAddress = tokenAddress;
    }

    function setTokenAddress(address tokenAddress) onlyOwner external {
        _tokenAddress = tokenAddress;
    }

    function getTokenAddress() external view returns (address){
        return _tokenAddress;
    }

    function faucet(address recipient, uint value) external {
        require(recipient != address(0), 'BEP20TokenFaucet: must be != 0 address');
        require(value <= 100 ether, 'BEP20TokenFaucet: value <= 100 ether');
        IBEP20(_tokenAddress).transfer(address(recipient), value);
    }

    function recharge(uint value) external {
        require(value > 0, 'BEP20TokenFaucet: value must be > 0');
        IBEP20(_tokenAddress).transferFrom(
            address(msg.sender),
            address(this),
            value
        );
    }

    function balance() public view returns (uint256) {
        return IBEP20(_tokenAddress).balanceOf(address(this));
    }
}