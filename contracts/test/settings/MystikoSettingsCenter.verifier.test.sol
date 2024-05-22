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
import "../../contracts/settings/pool/interfaces/IMystikoVerifier.sol";

contract MystikoSettingsCenterTest is Test, Random {
  address public dao;
  address[11] public rollupVerifiers;
  address[6] public transactVerifiers;
  uint256[5] public auditors;
  CertificateRegistry public certificateRegistry;
  MystikoRollerRegistry public rollerRegistry;
  MystikoRelayerRegistry public relayerRegistry;
  MystikoSettingsCenter public settings;

  event RollupVerifierEnabled(uint32 rollupSize);
  event RollupVerifierDisabled(uint32 rollupSize);
  event TransactVerifierEnabled(uint32 inputNumber, uint32 outputNumber);
  event TransactVerifierDisabled(uint32 inputNumber, uint32 outputNumber);

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

  function test_query_rollup_verifier() public {
    uint32 j = 1;
    for (uint8 i = 0; i < 11; i++) {
      WrappedVerifier memory w = settings.queryRollupVerifier(j);
      assertEq(w.verifier, rollupVerifiers[i]);
      assertTrue(w.enabled);
      j = j << 1;
    }
  }

  function test_query_transact_verifier() public {
    uint8[2] memory types = [1, 2];
    uint8[3] memory indices = [0, 1, 2];

    for (uint8 i = 0; i < types.length; i++) {
      for (uint8 j = 0; j < indices.length; j++) {
        uint32 verifierIndex = uint32(i * indices.length + j);
        WrappedVerifier memory w = settings.queryTransactVerifier(types[i], indices[j]);
        assertEq(w.verifier, transactVerifiers[verifierIndex]);
        assertTrue(w.enabled);
      }
    }
  }

  function test_enable_rollup_verifier() public {
    vm.expectRevert(GovernanceErrors.OnlyMystikoDAO.selector);
    settings.enableRollupVerifier(1);

    uint32 j = 1;
    for (uint8 i = 0; i < 11; i++) {
      vm.expectEmit(address(settings));
      emit RollupVerifierEnabled(j);
      vm.prank(dao);
      settings.enableRollupVerifier(j);
      WrappedVerifier memory w = settings.queryRollupVerifier(j);
      assertEq(w.verifier, rollupVerifiers[i]);
      assertTrue(w.enabled);
      j = j << 1;
    }

    vm.expectRevert(GovernanceErrors.InvalidRollupSize.selector);
    vm.prank(dao);
    settings.enableRollupVerifier(0);

    vm.expectRevert(GovernanceErrors.RollupSizeNotPowerOfTwo.selector);
    vm.prank(dao);
    settings.enableRollupVerifier(3);
  }

  function test_disable_rollup_verifier() public {
    vm.expectRevert(GovernanceErrors.OnlyMystikoDAO.selector);
    settings.disableRollupVerifier(1);

    uint32 j = 1;
    for (uint8 i = 0; i < 11; i++) {
      vm.expectEmit(address(settings));
      emit RollupVerifierDisabled(j);
      vm.prank(dao);
      settings.disableRollupVerifier(j);
      WrappedVerifier memory w = settings.queryRollupVerifier(j);
      assertEq(w.verifier, rollupVerifiers[i]);
      assertFalse(w.enabled);
      j = j << 1;
    }

    vm.expectRevert(GovernanceErrors.InvalidRollupSize.selector);
    vm.prank(dao);
    settings.disableRollupVerifier(0);

    vm.expectRevert(GovernanceErrors.RollupSizeNotPowerOfTwo.selector);
    vm.prank(dao);
    settings.disableRollupVerifier(3);
  }

  function test_enable_transact_verifier() public {
    vm.expectRevert(GovernanceErrors.OnlyMystikoDAO.selector);
    settings.enableTransactVerifier(1, 0);

    uint8[2] memory types = [1, 2];
    uint8[3] memory indices = [0, 1, 2];

    for (uint8 i = 0; i < types.length; i++) {
      for (uint8 j = 0; j < indices.length; j++) {
        uint32 verifierIndex = uint32(i * indices.length + j);

        vm.expectEmit(address(settings));
        emit TransactVerifierEnabled(types[i], indices[j]);
        vm.prank(dao);
        settings.enableTransactVerifier(types[i], indices[j]);
        WrappedVerifier memory w = settings.queryTransactVerifier(types[i], indices[j]);
        assertEq(w.verifier, transactVerifiers[verifierIndex]);
        assertTrue(w.enabled);
      }
    }

    vm.prank(dao);
    vm.expectRevert(GovernanceErrors.NumInputsGreaterThanZero.selector);
    settings.enableTransactVerifier(0, 0);
  }

  function test_disable_transact_verifier() public {
    vm.expectRevert(GovernanceErrors.OnlyMystikoDAO.selector);
    settings.disableTransactVerifier(1, 0);

    uint8[2] memory types = [1, 2];
    uint8[3] memory indices = [0, 1, 2];

    for (uint8 i = 0; i < types.length; i++) {
      for (uint8 j = 0; j < indices.length; j++) {
        uint32 verifierIndex = uint32(i * indices.length + j);

        vm.expectEmit(address(settings));
        emit TransactVerifierDisabled(types[i], indices[j]);
        vm.prank(dao);
        settings.disableTransactVerifier(types[i], indices[j]);
        WrappedVerifier memory w = settings.queryTransactVerifier(types[i], indices[j]);
        assertEq(w.verifier, transactVerifiers[verifierIndex]);
        assertFalse(w.enabled);
      }
    }

    vm.expectRevert(GovernanceErrors.NumInputsGreaterThanZero.selector);
    vm.prank(dao);
    settings.disableTransactVerifier(0, 0);
  }
}
