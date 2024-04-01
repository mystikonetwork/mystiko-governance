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
  MystikoRollerRegistry public rollerRegistry;
  MystikoRelayerRegistry public relayerRegistry;
  MystikoSettingsCenter public settings;

  event RelayerRegistryChanged(address indexed registry);

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
    rollerRegistry = new MystikoRollerRegistry(address(center), address(vXZK), 100_000e18);
    relayerRegistry = new MystikoRelayerRegistry(address(center), address(vXZK), 100_000e18);

    settings = new MystikoSettingsCenter(
      address(center),
      address(rollerRegistry),
      address(relayerRegistry),
      rollupVerifiers,
      transactVerifiers,
      auditors
    );
  }

  function test_can_do_relay() public {
    address relayer = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    address pool = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    CanDoRelayParams memory p1 = CanDoRelayParams({pool: pool, relayer: relayer});
    vm.expectRevert(GovernanceErrors.UnauthorizedRole.selector);
    vm.prank(pool);
    settings.canDoRelay(p1);

    vm.prank(dao);
    relayerRegistry.grantRole(relayer);

    vm.expectRevert(GovernanceErrors.InsufficientBalanceForAction.selector);
    vm.prank(pool);
    settings.canDoRelay(p1);

    vm.prank(dao);
    relayerRegistry.changeRelayerMinVoteTokenAmount(0);
    vm.prank(pool);
    bool canDo = settings.canDoRelay(p1);
    assertTrue(canDo);
  }

  function test_change_relayer_registry() public {
    vm.expectRevert(GovernanceErrors.OnlyMystikoDAO.selector);
    settings.changeRelayerRegistry(address(rollerRegistry));

    vm.expectRevert(GovernanceErrors.NotChanged.selector);
    vm.prank(dao);
    settings.changeRelayerRegistry(address(relayerRegistry));

    address newRegistry = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    vm.expectEmit(address(settings));
    emit RelayerRegistryChanged(newRegistry);
    vm.prank(dao);
    settings.changeRelayerRegistry(newRegistry);
    assertEq(settings.relayerRegistry(), newRegistry);
  }
}
