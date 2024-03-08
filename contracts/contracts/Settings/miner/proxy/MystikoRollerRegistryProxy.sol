// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IMystikoRollerRegistry, CanDoRollupParams} from "../interfaces/IMystikoRollerRegistry.sol";
import {MystikoDAOProxy} from "../../../governance/MystikoDAOProxy.sol";

contract MystikoRollerRegistryProxy is MystikoDAOProxy {
  constructor(address _center, address _registry) MystikoDAOProxy(_center, _registry) {}

  function canDoRollup(CanDoRollupParams calldata _params) external view returns (bool) {
    return IMystikoRollerRegistry(registry).canDoRollup(_params);
  }
}
