// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

struct CanDoRollupParams {
  address pool;
  address roller;
  uint256 rollupSize;
}

interface IMystikoRoller {
  function canDoRollup(CanDoRollupParams calldata _params) external view returns (bool);
}
