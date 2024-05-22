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
import "../../contracts/settings/rule/interfaces/ISanctions.sol";

contract MystikoSettingsCenterTest is Test, Random {
  address public dao;
  address[11] public rollupVerifiers;
  address[6] public transactVerifiers;
  uint256[5] public auditors;
  CertificateRegistry public certificateRegistry;
  MystikoRollerRegistry public rollerRegistry;
  MystikoRelayerRegistry public relayerRegistry;
  MystikoSettingsCenter public settings;

  event SanctionsCheck(bool state);
  event SanctionsListChanged(address list);

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
    certificateRegistry = new CertificateRegistry(address(center), address(0));
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

  function test_enable_sanction_check() public {
    vm.expectRevert(GovernanceErrors.OnlyMystikoDAO.selector);
    settings.enableSanctionsCheck();

    vm.expectEmit(address(settings));
    emit SanctionsCheck(true);
    vm.prank(dao);
    settings.enableSanctionsCheck();
    assertTrue(settings.sanctionsCheck());
  }

  function test_disable_sanction_check() public {
    vm.expectRevert(GovernanceErrors.OnlyMystikoDAO.selector);
    settings.disableSanctionsCheck();

    vm.expectEmit(address(settings));
    emit SanctionsCheck(false);
    vm.prank(dao);
    settings.disableSanctionsCheck();
    assertFalse(settings.sanctionsCheck());
  }

  function test_update_sanction_list() public {
    address list = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    vm.expectRevert(GovernanceErrors.OnlyMystikoDAO.selector);
    settings.updateSanctionsListAddress(ISanctions(list));

    vm.expectEmit(address(settings));
    emit SanctionsListChanged(list);
    vm.prank(dao);
    settings.updateSanctionsListAddress(ISanctions(list));
    assertEq(address(settings.sanctionsList()), list);
  }

  function test_is_sanctioned() public {
    address account = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));

    vm.prank(dao);
    settings.disableSanctionsCheck();
    assertFalse(settings.isSanctioned(account));

    vm.prank(dao);
    settings.enableSanctionsCheck();
    vm.expectRevert();
    assertFalse(settings.isSanctioned(account));
  }
}
