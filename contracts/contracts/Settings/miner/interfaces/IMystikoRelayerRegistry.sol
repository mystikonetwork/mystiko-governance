// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

struct CanDoRelayParams {
  address pool;
  address relayer;
}

interface IMystikoRelayerRegistry {
  function canDoRelay(CanDoRelayParams calldata _params) external view returns (bool);
}
