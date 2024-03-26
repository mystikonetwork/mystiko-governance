// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import "../../contracts/Settings/MystikoSettingsCenter.sol";
import "../../contracts/Settings/miner/impl/MystikoRelayerRegistry.sol";
import "../../contracts/Settings/miner/impl/MystikoRollerRegistry.sol";
import "../mock/MockMystikoToken.sol";
import "../../contracts/token/MystikoVoteToken.sol";
import "../../contracts/governance/impl/MystikoGovernorCenter.sol";
import "../utils/Random.sol";

contract MystikoSettingsCenterTest is Test, Random {
  address public dao;
  address[5] public rollupVerifiers;
  address[6] public transactVerifiers;
  uint256[5] public auditors;
  MystikoRelayerRegistry public rollerRegistry;
  MystikoRollerRegistry public relayerRegistry;
  MystikoSettingsCenter public settings;

  event AuditorPublicKeyUpdated(uint256 indexed index, uint256 publicKey);

  function setUp() public {
    dao = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    for (uint256 i = 0; i < 5; i++) {
      rollupVerifiers[i] = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
      transactVerifiers[i] = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
      auditors[i] = uint256(keccak256(abi.encodePacked(_random())));
    }
    transactVerifiers[5] = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));

    MockMystikoToken XZK = new MockMystikoToken();
    MystikoVoteToken vXZK = new MystikoVoteToken(XZK);
    MystikoGovernorCenter center = new MystikoGovernorCenter(dao);
    rollerRegistry = new MystikoRelayerRegistry(address(center), address(vXZK), 100_000e18);
    relayerRegistry = new MystikoRollerRegistry(address(center), address(vXZK), 100_000e18);

    settings = new MystikoSettingsCenter(
      address(center),
      address(rollerRegistry),
      address(relayerRegistry),
      rollupVerifiers,
      transactVerifiers,
      auditors
    );
  }

  function test_query_auditor_public_key() public {
    assertEq(settings.queryAuditorPublicKey(0), auditors[0]);
    assertEq(settings.queryAuditorPublicKey(1), auditors[1]);
    assertEq(settings.queryAuditorPublicKey(2), auditors[2]);
    assertEq(settings.queryAuditorPublicKey(3), auditors[3]);
    assertEq(settings.queryAuditorPublicKey(4), auditors[4]);
  }

  function test_query_all_auditor_public_keys() public {
    uint256[] memory keys = settings.queryAllAuditorPublicKeys();
    for (uint256 i = 0; i < 5; i++) {
      assertEq(keys[i], auditors[i]);
    }
  }

  function test_update_auditor_public_key() public {
    uint256 newAuditor = uint256(keccak256(abi.encodePacked(_random())));
    vm.expectRevert(GovernanceErrors.OnlyMystikoDAO.selector);
    settings.updateAuditorPublicKey(0, newAuditor);

    vm.expectEmit(address(settings));
    emit AuditorPublicKeyUpdated(0, newAuditor);
    vm.prank(dao);
    settings.updateAuditorPublicKey(0, newAuditor);
    assertEq(settings.queryAuditorPublicKey(0), newAuditor);
    vm.prank(dao);
    settings.updateAuditorPublicKey(1, newAuditor);
    assertEq(settings.queryAuditorPublicKey(1), newAuditor);
    vm.prank(dao);
    settings.updateAuditorPublicKey(2, newAuditor);
    assertEq(settings.queryAuditorPublicKey(2), newAuditor);
    vm.prank(dao);
    settings.updateAuditorPublicKey(3, newAuditor);
    assertEq(settings.queryAuditorPublicKey(3), newAuditor);
    vm.prank(dao);
    settings.updateAuditorPublicKey(4, newAuditor);
    assertEq(settings.queryAuditorPublicKey(4), newAuditor);

    vm.prank(dao);
    vm.expectRevert(GovernanceErrors.AuditorIndexError.selector);
    settings.updateAuditorPublicKey(5, newAuditor);

    vm.prank(dao);
    vm.expectRevert(GovernanceErrors.NotChanged.selector);
    settings.updateAuditorPublicKey(4, newAuditor);
  }
}
