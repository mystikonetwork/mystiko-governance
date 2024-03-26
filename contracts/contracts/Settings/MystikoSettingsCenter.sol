// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {MystikoDAOGoverned} from "../governance/MystikoDAOProxy.sol";
import {MystikoVerifierRegistry} from "./pool/impl/MystikoVerifierRegistry.sol";
import {MystikoAuditorRegistry} from "./pool/impl/MystikoAuditorRegistry.sol";
import {IMystikoRollerRegistry, CanDoRollupParams} from "./miner/interfaces/IMystikoRollerRegistry.sol";
import {IMystikoRelayerRegistry, CanDoRelayParams} from "./miner/interfaces/IMystikoRelayerRegistry.sol";
import {GovernanceErrors} from "./../libs/common/GovernanceErrors.sol";

contract MystikoSettingsCenter is
  IMystikoRollerRegistry,
  IMystikoRelayerRegistry,
  MystikoDAOGoverned,
  MystikoVerifierRegistry,
  MystikoAuditorRegistry
{
  address public rollerRegistry;
  address public relayerRegistry;

  event RollerRegistryChanged(address indexed registry);
  event RelayerRegistryChanged(address indexed registry);

  constructor(
    address _daoCenter,
    address _rollerRegistry,
    address _relayerRegistry,
    address[5] memory _rollupVerifiers,
    address[6] memory _transactVerifiers,
    uint256[AUDITOR_COUNT] memory _auditors
  )
    MystikoDAOGoverned(_daoCenter)
    MystikoVerifierRegistry(_rollupVerifiers, _transactVerifiers)
    MystikoAuditorRegistry(_auditors)
  {
    rollerRegistry = _rollerRegistry;
    relayerRegistry = _relayerRegistry;
  }

  function canDoRollup(CanDoRollupParams calldata _params) external view returns (bool) {
    return IMystikoRollerRegistry(rollerRegistry).canDoRollup(_params);
  }

  function canDoRelay(CanDoRelayParams calldata _params) external view returns (bool) {
    return IMystikoRelayerRegistry(relayerRegistry).canDoRelay(_params);
  }

  function changeRollerRegistry(address _newRollerRegistry) external onlyMystikoDAO {
    if (rollerRegistry == _newRollerRegistry) revert GovernanceErrors.NotChanged();
    rollerRegistry = _newRollerRegistry;
    emit RollerRegistryChanged(rollerRegistry);
  }

  function changeRelayerRegistry(address _newRelayerRegistry) external onlyMystikoDAO {
    if (relayerRegistry == _newRelayerRegistry) revert GovernanceErrors.NotChanged();
    relayerRegistry = _newRelayerRegistry;
    emit RelayerRegistryChanged(relayerRegistry);
  }
}
