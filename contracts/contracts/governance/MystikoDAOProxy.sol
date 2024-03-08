// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {MystikoDAOGoverned} from "./MystikoDAOGoverned.sol";
import {CustomErrors} from "../libs/common/CustomErrors.sol";

abstract contract MystikoDAOProxy is MystikoDAOGoverned {
  address public registry;

  event RegistryChanged(address indexed registry);

  constructor(address _center, address _registry) MystikoDAOGoverned(_center) {
    registry = _registry;
  }

  function changeRegistry(address _newRegistry) external onlyMystikoDAO {
    if (registry == _newRegistry) revert CustomErrors.NotChanged();
    registry = _newRegistry;
    emit RegistryChanged(registry);
  }
}
