// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IMystikoRelayerRegistry, CanDoRelayParams} from "../interfaces/IMystikoRelayerRegistry.sol";
import {MystikoDAOProxy} from "../../../governance/MystikoDAOProxy.sol";

contract MystikoRelayerRegistryProxy is MystikoDAOProxy {
  constructor(address _center, address _registry) MystikoDAOProxy(_center, _registry) {}

  function canDoRelay(CanDoRelayParams calldata _params) external view returns (bool) {
    return IMystikoRelayerRegistry(registry).canDoRelay(_params);
  }
}
