// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IMystikoRelayerRegistry, CanDoRelayParams} from "../interfaces/IMystikoRelayerRegistry.sol";
import {MystikoDAOGoverned} from "../../../governance/MystikoDAOGoverned.sol";
import {CustomErrors} from "../../../libs/common/CustomErrors.sol";

contract MystikoRelayerRegistryProxy is IMystikoRelayerRegistry, MystikoDAOGoverned {
  address public registry;

  event RelayerRegistryChanged(address indexed registry);

  constructor(address _center, address _registry) MystikoDAOGoverned(_center) {
    registry = _registry;
  }

  function canDoRelay(CanDoRelayParams calldata _params) external view returns (bool) {
    return IMystikoRelayerRegistry(registry).canDoRelay(_params);
  }

  function changeRelayerRegistry(address _newRegistry) external onlyMystikoDAO {
    if (registry == _newRegistry) revert CustomErrors.NotChanged();
    registry = _newRegistry;
    emit RelayerRegistryChanged(registry);
  }
}
