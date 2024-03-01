// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IStakingToken {
  function mint(address account, uint256 _mintStXzkAmount) external;
  function burn(address account, uint256 _burnStXzkAmount, uint256 _xzkAmount) external;
}
