// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import {SafeMath} from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IStakingAction} from "../interface/iStakingAction.sol";
import {IStakingToken} from "../interface/iStakingToken.sol";

contract StakingAction is IStakingAction {
  using SafeMath for uint256;

  address private mstko;
  address private stMstko;

  constructor(address _mstko, address _stMstko) {
    mstko = _mstko;
    stMstko = _stMstko;
  }

  function stake(uint256 _mstkoAmount) external {
    uint256 mintAmount = _swapStMstko(_mstkoAmount);
    IStakingToken(stMstko).mint(msg.sender, mintAmount, _mstkoAmount);
  }

  function withdraw(uint256 _stMstkoAmount) external {
    uint256 recvMstko = _swapMstko(_stMstkoAmount);
    IStakingToken(stMstko).burn(msg.sender, _stMstkoAmount, recvMstko);
  }

  function swapStMstko(uint256 _mstkoAmount) external view returns (uint256) {
    return _swapStMstko(_mstkoAmount);
  }

  function swapMstko(uint256 _stMstkoAmount) external view returns (uint256) {
    return _swapMstko(_stMstkoAmount);
  }

  function _swapStMstko(uint256 _mstkoAmount) internal view returns (uint256) {
    uint256 totalStMstko = _getTotalStMstko();
    return totalStMstko == 0 ? _mstkoAmount : _mstkoAmount.mul(totalStMstko).div(_getPoolMstko());
  }

  function _swapMstko(uint256 _stMstkoAmount) internal view returns (uint256) {
    uint256 totalStMstko = _getTotalStMstko();
    return totalStMstko == 0 ? _stMstkoAmount : _stMstkoAmount.mul(_getPoolMstko()).div(totalStMstko);
  }

  function _getTotalStMstko() internal view returns (uint256) {
    return IERC20(stMstko).totalSupply();
  }

  function _getPoolMstko() internal view returns (uint256) {
    return IERC20(mstko).balanceOf(stMstko);
  }
}
