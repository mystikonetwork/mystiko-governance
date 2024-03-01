// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IStakingAction {
  function stake(uint256 _amount) external;
  function withdraw(uint256 _amount) external;
  function swapToStXZK(uint256 _amount) external view returns (uint256);
  function swapToXZK(uint256 _amount) external view returns (uint256);
  function pause() external;
  function unpause() external;
}
