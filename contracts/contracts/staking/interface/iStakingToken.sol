// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

interface IStakingToken {
  function mint(address account, uint256 _mintAmount, uint256 _mstkoAmount) external;
  function burn(address account, uint256 _burnAmount, uint256 _mstkoAmount) external;
}
