// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IMystikoRollerRegistry, CanDoRollupParams} from "../interfaces/IMystikoRollerRegistry.sol";
import {MystikoDAOGoverned} from "../../../governance/MystikoDAOGoverned.sol";
import {CustomErrors} from "../../../libs/common/CustomErrors.sol";

contract MystikoRollerRegistryProxy is IMystikoRollerRegistry, MystikoDAOGoverned {
  address public registry;

  event RollerRegistryChanged(address indexed registry);

  constructor(address _center, address _registry) MystikoDAOGoverned(_center) {
    registry = _registry;
  }

  function canDoRollup(CanDoRollupParams calldata _params) external view returns (bool) {
    return IMystikoRollerRegistry(registry).canDoRollup(_params);
  }

  function changeRollerRegistry(address _newRegistry) external onlyMystikoDAO {
    if (registry == _newRegistry) revert CustomErrors.NotChanged();
    registry = _newRegistry;
    emit RollerRegistryChanged(registry);
  }
}
