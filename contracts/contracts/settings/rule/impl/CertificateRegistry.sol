// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ICertificate, CertificateParams} from "../interfaces/ICertificate.sol";
import {MystikoDAOGoverned} from "../../../governance/MystikoDAOGoverned.sol";
import {GovernanceErrors} from "../../../libs/common/GovernanceErrors.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract CertificateRegistry is ICertificate, MystikoDAOGoverned {
  address public issuer;
  bool public certificateCheck = true;

  event CertificateCheck(bool state);
  event IssuerChanged(address issuer);

  constructor(address _daoCenter, address _issuer) MystikoDAOGoverned(_daoCenter) {
    issuer = _issuer;
  }

  function verifyCertificate(CertificateParams memory _params) external view returns (bool) {
    if (!certificateCheck) {
      return true;
    }

    if (block.timestamp > _params.deadline) {
      revert GovernanceErrors.ExpiredCertificate(_params.deadline);
    }

    bytes32 hash = keccak256(
      abi.encodePacked(block.chainid, _params.account, _params.asset, _params.deadline)
    );
    address signer = ECDSA.recover(hash, _params.signature);
    if (signer != issuer) {
      revert GovernanceErrors.InvalidIssuer();
    }

    return true;
  }

  function enableCertificateCheck() external onlyMystikoDAO {
    certificateCheck = true;
    emit CertificateCheck(certificateCheck);
  }

  function disableCertificateCheck() external onlyMystikoDAO {
    certificateCheck = false;
    emit CertificateCheck(certificateCheck);
  }

  function getIssuerAddress() external view returns (address) {
    return issuer;
  }

  function updateIssuerAddress(address _newIssuer) external onlyMystikoDAO {
    issuer = _newIssuer;
    emit IssuerChanged(issuer);
  }
}
