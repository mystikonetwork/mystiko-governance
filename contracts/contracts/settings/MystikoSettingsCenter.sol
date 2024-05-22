// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {MystikoDAOGoverned} from "../governance/MystikoDAOProxy.sol";
import {MystikoVerifier} from "./pool/impl/MystikoVerifier.sol";
import {MystikoAuditor} from "./pool/impl/MystikoAuditor.sol";
import {Sanctions} from "./rule/impl/Sanctions.sol";
import {IMystikoRoller, CanDoRollupParams} from "./miner/interfaces/IMystikoRoller.sol";
import {IMystikoRelayer, CanDoRelayParams} from "./miner/interfaces/IMystikoRelayer.sol";
import {ICertificate, CertificateParams} from "./rule/interfaces/ICertificate.sol";
import {GovernanceErrors} from "./../libs/common/GovernanceErrors.sol";

contract MystikoSettingsCenter is
  ICertificate,
  IMystikoRoller,
  IMystikoRelayer,
  MystikoDAOGoverned,
  MystikoVerifier,
  MystikoAuditor,
  Sanctions
{
  ICertificate public certificateRegistry;
  IMystikoRoller public rollerRegistry;
  IMystikoRelayer public relayerRegistry;

  event CertificateRegistryChanged(address indexed registry);
  event RollerRegistryChanged(address indexed registry);
  event RelayerRegistryChanged(address indexed registry);

  constructor(
    address _daoCenter,
    ICertificate _certificateRegistry,
    IMystikoRoller _rollerRegistry,
    IMystikoRelayer _relayerRegistry,
    address[11] memory _rollupVerifiers,
    address[6] memory _transactVerifiers,
    uint256[AUDITOR_COUNT] memory _auditors
  )
    MystikoDAOGoverned(_daoCenter)
    MystikoVerifier(_rollupVerifiers, _transactVerifiers)
    MystikoAuditor(_auditors)
  {
    certificateRegistry = _certificateRegistry;
    rollerRegistry = _rollerRegistry;
    relayerRegistry = _relayerRegistry;
  }

  function getIssuerAddress() external view returns (address) {
    return certificateRegistry.getIssuerAddress();
  }

  function verifyCertificate(CertificateParams memory _params) external view returns (bool) {
    return certificateRegistry.verifyCertificate(_params);
  }

  function canDoRollup(CanDoRollupParams calldata _params) external view returns (bool) {
    return rollerRegistry.canDoRollup(_params);
  }

  function canDoRelay(CanDoRelayParams calldata _params) external view returns (bool) {
    return relayerRegistry.canDoRelay(_params);
  }

  function changeCertificateRegistry(ICertificate _newCertificateRegistry) external onlyMystikoDAO {
    if (certificateRegistry == _newCertificateRegistry) revert GovernanceErrors.NotChanged();
    certificateRegistry = _newCertificateRegistry;
    emit CertificateRegistryChanged(address(certificateRegistry));
  }

  function changeRollerRegistry(IMystikoRoller _newRollerRegistry) external onlyMystikoDAO {
    if (rollerRegistry == _newRollerRegistry) revert GovernanceErrors.NotChanged();
    rollerRegistry = _newRollerRegistry;
    emit RollerRegistryChanged(address(rollerRegistry));
  }

  function changeRelayerRegistry(IMystikoRelayer _newRelayerRegistry) external onlyMystikoDAO {
    if (relayerRegistry == _newRelayerRegistry) revert GovernanceErrors.NotChanged();
    relayerRegistry = _newRelayerRegistry;
    emit RelayerRegistryChanged(address(relayerRegistry));
  }
}
