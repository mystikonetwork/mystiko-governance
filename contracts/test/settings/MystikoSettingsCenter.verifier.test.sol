// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import "../../contracts/settings/MystikoSettingsCenter.sol";
import "../../contracts/settings/miner/impl/MystikoRelayerRegistry.sol";
import "../../contracts/settings/miner/impl/MystikoRollerRegistry.sol";
import "../mock/MockMystikoToken.sol";
import "../../contracts/token/MystikoVoteToken.sol";
import "../../contracts/governance/impl/MystikoGovernorCenter.sol";
import "../utils/Random.sol";
import "../../contracts/settings/pool/interfaces/IMystikoVerifierRegistry.sol";

contract MystikoSettingsCenterTest is Test, Random {
  address public dao;
  address[5] public rollupVerifiers;
  address[6] public transactVerifiers;
  uint256[5] public auditors;
  MystikoRelayerRegistry public rollerRegistry;
  MystikoRollerRegistry public relayerRegistry;
  MystikoSettingsCenter public settings;

  event RollupVerifierEnabled(uint32 rollupSize, address verifier);
  event RollupVerifierDisabled(uint32 rollupSize);
  event TransactVerifierEnabled(uint32 inputNumber, uint32 outputNumber, address verifier);
  event TransactVerifierDisabled(uint32 inputNumber, uint32 outputNumber);

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

  function test_query_rollup_verifier() public {
    WrappedVerifier memory w = settings.queryRollupVerifier(1);
    assertEq(w.verifier, rollupVerifiers[0]);
    assertTrue(w.enabled);

    w = settings.queryRollupVerifier(2);
    assertEq(w.verifier, rollupVerifiers[1]);
    assertTrue(w.enabled);

    w = settings.queryRollupVerifier(4);
    assertEq(w.verifier, rollupVerifiers[2]);
    assertTrue(w.enabled);

    w = settings.queryRollupVerifier(8);
    assertEq(w.verifier, rollupVerifiers[3]);
    assertTrue(w.enabled);

    w = settings.queryRollupVerifier(16);
    assertEq(w.verifier, rollupVerifiers[4]);
    assertTrue(w.enabled);
  }

  function test_query_transact_verifier() public {
    WrappedVerifier memory w = settings.queryTransactVerifier(1, 0);
    assertEq(w.verifier, transactVerifiers[0]);
    assertTrue(w.enabled);

    w = settings.queryTransactVerifier(1, 1);
    assertEq(w.verifier, transactVerifiers[1]);
    assertTrue(w.enabled);

    w = settings.queryTransactVerifier(1, 2);
    assertEq(w.verifier, transactVerifiers[2]);
    assertTrue(w.enabled);

    w = settings.queryTransactVerifier(2, 0);
    assertEq(w.verifier, transactVerifiers[3]);
    assertTrue(w.enabled);

    w = settings.queryTransactVerifier(2, 1);
    assertEq(w.verifier, transactVerifiers[4]);
    assertTrue(w.enabled);

    w = settings.queryTransactVerifier(2, 2);
    assertEq(w.verifier, transactVerifiers[5]);
    assertTrue(w.enabled);
  }

  function test_enable_rollup_verifier() public {
    address newVerifier = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    vm.expectRevert(GovernanceErrors.OnlyMystikoDAO.selector);
    settings.enableRollupVerifier(1, newVerifier);

    vm.expectEmit(address(settings));
    emit RollupVerifierEnabled(1, newVerifier);
    vm.prank(dao);
    settings.enableRollupVerifier(1, newVerifier);
    WrappedVerifier memory w = settings.queryRollupVerifier(1);
    assertEq(w.verifier, newVerifier);
    assertTrue(w.enabled);

    vm.expectEmit(address(settings));
    emit RollupVerifierEnabled(2, newVerifier);
    vm.prank(dao);
    settings.enableRollupVerifier(2, newVerifier);
    w = settings.queryRollupVerifier(2);
    assertEq(w.verifier, newVerifier);
    assertTrue(w.enabled);

    vm.expectEmit(address(settings));
    emit RollupVerifierEnabled(4, newVerifier);
    vm.prank(dao);
    settings.enableRollupVerifier(4, newVerifier);
    w = settings.queryRollupVerifier(4);
    assertEq(w.verifier, newVerifier);
    assertTrue(w.enabled);

    vm.expectEmit(address(settings));
    emit RollupVerifierEnabled(8, newVerifier);
    vm.prank(dao);
    settings.enableRollupVerifier(8, newVerifier);
    w = settings.queryRollupVerifier(8);
    assertEq(w.verifier, newVerifier);
    assertTrue(w.enabled);

    vm.expectEmit(address(settings));
    emit RollupVerifierEnabled(16, newVerifier);
    vm.prank(dao);
    settings.enableRollupVerifier(16, newVerifier);
    w = settings.queryRollupVerifier(16);
    assertEq(w.verifier, newVerifier);
    assertTrue(w.enabled);

    vm.expectRevert(GovernanceErrors.InvalidRollupSize.selector);
    vm.prank(dao);
    settings.enableRollupVerifier(0, newVerifier);

    vm.expectRevert(GovernanceErrors.RollupSizeNotPowerOfTwo.selector);
    vm.prank(dao);
    settings.enableRollupVerifier(3, newVerifier);
  }

  function test_disable_rollup_verifier() public {
    vm.expectRevert(GovernanceErrors.OnlyMystikoDAO.selector);
    settings.disableRollupVerifier(1);

    vm.expectEmit(address(settings));
    emit RollupVerifierDisabled(1);
    vm.prank(dao);
    settings.disableRollupVerifier(1);
    WrappedVerifier memory w = settings.queryRollupVerifier(1);
    assertFalse(w.enabled);

    vm.expectRevert(GovernanceErrors.InvalidRollupSize.selector);
    vm.prank(dao);
    settings.disableRollupVerifier(0);

    vm.expectRevert(GovernanceErrors.RollupSizeNotPowerOfTwo.selector);
    vm.prank(dao);
    settings.disableRollupVerifier(3);
  }

  function test_enable_transact_verifier() public {
    address newVerifier = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    vm.expectRevert(GovernanceErrors.OnlyMystikoDAO.selector);
    settings.enableTransactVerifier(1, 0, newVerifier);

    vm.expectEmit(address(settings));
    emit TransactVerifierEnabled(1, 0, newVerifier);
    vm.prank(dao);
    settings.enableTransactVerifier(1, 0, newVerifier);
    WrappedVerifier memory w = settings.queryTransactVerifier(1, 0);
    assertEq(w.verifier, newVerifier);
    assertTrue(w.enabled);

    vm.expectEmit(address(settings));
    emit TransactVerifierEnabled(1, 1, newVerifier);
    vm.prank(dao);
    settings.enableTransactVerifier(1, 1, newVerifier);
    w = settings.queryTransactVerifier(1, 1);
    assertEq(w.verifier, newVerifier);
    assertTrue(w.enabled);

    vm.expectEmit(address(settings));
    emit TransactVerifierEnabled(1, 2, newVerifier);
    vm.prank(dao);
    settings.enableTransactVerifier(1, 2, newVerifier);
    w = settings.queryTransactVerifier(1, 2);
    assertEq(w.verifier, newVerifier);
    assertTrue(w.enabled);

    vm.expectEmit(address(settings));
    emit TransactVerifierEnabled(2, 0, newVerifier);
    vm.prank(dao);
    settings.enableTransactVerifier(2, 0, newVerifier);
    w = settings.queryTransactVerifier(2, 0);
    assertEq(w.verifier, newVerifier);
    assertTrue(w.enabled);

    vm.expectEmit(address(settings));
    emit TransactVerifierEnabled(2, 1, newVerifier);
    vm.prank(dao);
    settings.enableTransactVerifier(2, 1, newVerifier);
    w = settings.queryTransactVerifier(2, 1);
    assertEq(w.verifier, newVerifier);
    assertTrue(w.enabled);

    vm.expectEmit(address(settings));
    emit TransactVerifierEnabled(2, 2, newVerifier);
    vm.prank(dao);
    settings.enableTransactVerifier(2, 2, newVerifier);
    w = settings.queryTransactVerifier(2, 2);
    assertEq(w.verifier, newVerifier);
    assertTrue(w.enabled);

    vm.prank(dao);
    vm.expectRevert(GovernanceErrors.NumInputsGreaterThanZero.selector);
    settings.enableTransactVerifier(0, 0, newVerifier);
  }

  function test_disable_transact_verifier() public {
    vm.expectRevert(GovernanceErrors.OnlyMystikoDAO.selector);
    settings.disableTransactVerifier(1, 0);

    vm.expectEmit(address(settings));
    emit TransactVerifierDisabled(1, 0);
    vm.prank(dao);
    settings.disableTransactVerifier(1, 0);
    WrappedVerifier memory w = settings.queryTransactVerifier(1, 0);
    assertFalse(w.enabled);

    vm.expectRevert(GovernanceErrors.NumInputsGreaterThanZero.selector);
    vm.prank(dao);
    settings.disableTransactVerifier(0, 0);
  }
}
