// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IMystikoRelayerRegistry, CanDoRelayParams} from "../interfaces/IMystikoRelayerRegistry.sol";
import {MystikoDAOProxy} from "../../../governance/MystikoDAOProxy.sol";

contract MystikoRelayerRegistryProxy is IMystikoRelayerRegistry, MystikoDAOProxy {
  constructor(address _daoCenter, address _registry) MystikoDAOProxy(_daoCenter, _registry) {}

  function canDoRelay(CanDoRelayParams calldata _params) external view returns (bool) {
    return IMystikoRelayerRegistry(registry).canDoRelay(_params);
  }
}
