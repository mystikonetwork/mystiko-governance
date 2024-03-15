// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import "../../../../contracts/token/MystikoVoteToken.sol";
import "../../../mock/MockMystikoToken.sol";
import "../../../../contracts/Settings/miner/impl/MystikoRelayerRegistry.sol";
import "../../../../contracts/Settings/miner/interfaces/IMystikoRelayerRegistry.sol";
import "../../../../contracts/governance/impl/MystikoGovernorCenter.sol";
import "../../../../contracts/libs/common/GovernanceErrors.sol";
import "../../../utils/Random.sol";

contract MystikoRelayerRegistryTest is Test, Random {
  address public dao;
  MystikoGovernorCenter public center;
  MockMystikoToken public XZK;
  MystikoVoteToken public vXZK;
  MystikoRelayerRegistry public registry;

  event MinVoteTokenAmountChanged(uint256 _amount);
  event MinRollupSizeChanged(uint256 _size);
  event RoleGranted(address indexed account);
  event RoleRevoked(address indexed account);

  function setUp() public {
    XZK = new MockMystikoToken();
    vXZK = new MystikoVoteToken(XZK);
    dao = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    center = new MystikoGovernorCenter(dao);
    registry = new MystikoRelayerRegistry(address(center), address(vXZK), 100_000e18);
  }

  function test_canDoRelay() public {
    address relayer = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    address pool = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));

    CanDoRelayParams memory p1 = CanDoRelayParams({pool: pool, relayer: relayer});
    vm.expectRevert(GovernanceErrors.UnauthorizedRole.selector);
    vm.prank(pool);
    registry.canDoRelay(p1);

    vm.prank(dao);
    registry.grantRole(relayer);

    vm.expectRevert(GovernanceErrors.InsufficientBalanceForAction.selector);
    vm.prank(pool);
    registry.canDoRelay(p1);

    uint256 voteAmount = 100_000e18;
    XZK.transfer(relayer, voteAmount);
    vm.prank(relayer);
    XZK.approve(address(vXZK), voteAmount);
    vm.prank(relayer);
    vXZK.depositFor(relayer, voteAmount);
    vm.prank(pool);
    bool canDo = registry.canDoRelay(p1);
    assertTrue(canDo);

    vm.prank(dao);
    registry.revokeRole(relayer);

    vm.expectRevert(GovernanceErrors.UnauthorizedRole.selector);
    vm.prank(pool);
    registry.canDoRelay(p1);

    vm.prank(dao);
    registry.grantRole(address(0));

    bool canDo2 = registry.canDoRelay(p1);
    assertTrue(canDo2);
  }

  function test_canDoRelay_with_zero_token() public {
    MystikoRelayerRegistry registryZero = new MystikoRelayerRegistry(address(center), address(vXZK), 0);
    address relayer = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    address pool = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));

    CanDoRelayParams memory p1 = CanDoRelayParams({pool: pool, relayer: relayer});
    vm.expectRevert(GovernanceErrors.UnauthorizedRole.selector);
    vm.prank(pool);
    registryZero.canDoRelay(p1);

    vm.prank(dao);
    registryZero.grantRole(relayer);

    vm.prank(pool);
    bool canDo = registryZero.canDoRelay(p1);
    assertTrue(canDo);
  }

  function test_changeMinVoteTokenAmount() public {
    address operator = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    vm.expectRevert(GovernanceErrors.OnlyMystikoDAO.selector);
    vm.prank(operator);
    registry.changeMinVoteTokenAmount(100_000e18);

    vm.expectRevert(GovernanceErrors.NotChanged.selector);
    vm.prank(dao);
    registry.changeMinVoteTokenAmount(100_000e18);

    vm.expectEmit(address(registry));
    emit MinVoteTokenAmountChanged(200_000e18);
    vm.prank(dao);
    registry.changeMinVoteTokenAmount(200_000e18);
    assertEq(registry.minVoteTokenAmount(), 200_000e18);
  }

  function test_grant_and_revoke_relayer() public {
    address relayer = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    assertFalse(registry.hasRole(relayer));

    vm.expectRevert(GovernanceErrors.OnlyMystikoDAO.selector);
    registry.grantRole(relayer);

    vm.expectEmit(address(registry));
    emit RoleGranted(relayer);
    vm.prank(dao);
    registry.grantRole(relayer);
    assertTrue(registry.hasRole(relayer));

    vm.expectRevert(GovernanceErrors.OnlyMystikoDAO.selector);
    registry.revokeRole(relayer);

    vm.expectEmit(address(registry));
    emit RoleRevoked(relayer);
    vm.prank(dao);
    registry.revokeRole(relayer);
    assertFalse(registry.hasRole(relayer));
  }

  function test_grant_and_revoke_relayers() public {
    address relayer1 = address(0);
    address relayer2 = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    assertFalse(registry.hasRole(relayer1));
    assertFalse(registry.hasRole(relayer2));

    address[] memory Relayers = new address[](2);
    Relayers[0] = relayer1;
    Relayers[1] = relayer2;
    vm.expectRevert(GovernanceErrors.OnlyMystikoDAO.selector);
    registry.grantRoles(Relayers);

    vm.expectEmit(address(registry));
    emit RoleGranted(relayer1);
    emit RoleGranted(relayer2);
    vm.prank(dao);
    registry.grantRoles(Relayers);
    assertTrue(registry.hasRole(relayer1));
    assertTrue(registry.hasRole(relayer2));

    vm.expectRevert(GovernanceErrors.OnlyMystikoDAO.selector);
    registry.revokeRoles(Relayers);

    vm.expectEmit(address(registry));
    emit RoleRevoked(relayer1);
    emit RoleRevoked(relayer2);
    vm.prank(dao);
    registry.revokeRoles(Relayers);
    assertFalse(registry.hasRole(relayer1));
    assertFalse(registry.hasRole(relayer2));
  }
}
