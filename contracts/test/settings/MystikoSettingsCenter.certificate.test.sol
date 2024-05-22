// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import "../../contracts/settings/MystikoSettingsCenter.sol";
import "../../contracts/settings/rule/impl/CertificateRegistry.sol";
import "../../contracts/settings/miner/impl/MystikoRelayerRegistry.sol";
import "../../contracts/settings/miner/impl/MystikoRollerRegistry.sol";
import "../mock/MockMystikoToken.sol";
import "../../contracts/token/MystikoVoteToken.sol";
import "../../contracts/governance/impl/MystikoGovernorCenter.sol";
import "../utils/Random.sol";
import "../../contracts/settings/rule/interfaces/ICertificate.sol";

contract MystikoSettingsCenterTest is Test, Random {
  address public dao;
  uint256 public privateKey;
  address public issuer;
  address[11] public rollupVerifiers;
  address[6] public transactVerifiers;
  uint256[5] public auditors;
  CertificateRegistry public certificateRegistry;
  MystikoRollerRegistry public rollerRegistry;
  MystikoRelayerRegistry public relayerRegistry;
  MystikoSettingsCenter public settings;

  event CertificateRegistryChanged(address indexed registry);

  function setUp() public {
    dao = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    for (uint256 i = 0; i < 11; i++) {
      rollupVerifiers[i] = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    }
    for (uint256 i = 0; i < 6; i++) {
      transactVerifiers[i] = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    }
    for (uint256 i = 0; i < 5; i++) {
      auditors[i] = uint256(keccak256(abi.encodePacked(_random())));
    }

    MockMystikoToken XZK = new MockMystikoToken();
    MystikoVoteToken vXZK = new MystikoVoteToken(XZK);
    MystikoGovernorCenter center = new MystikoGovernorCenter(dao);
    privateKey = uint256(keccak256(abi.encodePacked(_random())));
    issuer = vm.addr(privateKey);
    certificateRegistry = new CertificateRegistry(address(center), issuer);
    rollerRegistry = new MystikoRollerRegistry(address(center), address(vXZK), 100_000e18);
    relayerRegistry = new MystikoRelayerRegistry(address(center), address(vXZK), 100_000e18);

    settings = new MystikoSettingsCenter(
      address(center),
      ICertificate(certificateRegistry),
      IMystikoRoller(rollerRegistry),
      IMystikoRelayer(relayerRegistry),
      rollupVerifiers,
      transactVerifiers,
      auditors
    );
  }

  function test_get_issuer_address() public {
    assertEq(settings.getIssuerAddress(), issuer);
  }

  function test_change_certificate_registry() public {
    vm.expectRevert(GovernanceErrors.OnlyMystikoDAO.selector);
    settings.changeCertificateRegistry(ICertificate(certificateRegistry));

    vm.expectRevert(GovernanceErrors.NotChanged.selector);
    vm.prank(dao);
    settings.changeCertificateRegistry(ICertificate(certificateRegistry));

    ICertificate newCertificate = ICertificate(
      address(uint160(uint256(keccak256(abi.encodePacked(_random())))))
    );
    vm.expectEmit(address(settings));
    emit CertificateRegistryChanged(address(newCertificate));
    vm.prank(dao);
    settings.changeCertificateRegistry(newCertificate);
    assertEq(address(settings.certificateRegistry()), address(newCertificate));
  }

  function test_verify_certificate() public {
    uint256 deadline = block.timestamp + 1 days;
    address account = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    address asset = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));

    // Create a valid signature
    bytes32 hash = keccak256(abi.encodePacked(block.chainid, account, asset, deadline));
    (uint8 v, bytes32 r, bytes32 s) = vm.sign(privateKey, hash);
    bytes memory signature = abi.encodePacked(r, s, v);

    CertificateParams memory params = CertificateParams({
      account: account,
      asset: asset,
      deadline: deadline,
      signature: signature
    });

    bool result = settings.verifyCertificate(params);
    assertTrue(result);
  }

  function signMessage(bytes32 hash, address signer) internal returns (bytes memory) {
    (uint8 v, bytes32 r, bytes32 s) = vm.sign(uint256(uint160(signer)), hash);
    return abi.encodePacked(r, s, v);
  }
}
