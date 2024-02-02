// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

interface IStakingAction {
  function stake(uint256 _mstkoAmount) external;
  function withdraw(uint256 _stMstkoAmount) external;
  function swapMstko(uint256 _stMstkoAmount) external returns (uint256);
  function swapStMstko(uint256 _mstkoAmount) external returns (uint256);
  function pause() external;
  function unpause() external;
}
