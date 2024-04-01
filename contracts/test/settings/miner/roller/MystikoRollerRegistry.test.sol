// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import "../../../../contracts/token/MystikoVoteToken.sol";
import "../../../mock/MockMystikoToken.sol";
import "../../../../contracts/settings/miner/impl/MystikoRollerRegistry.sol";
import "../../../../contracts/settings/miner/interfaces/IMystikoRollerRegistry.sol";
import "../../../../contracts/governance/impl/MystikoGovernorCenter.sol";
import "../../../../contracts/libs/common/GovernanceErrors.sol";
import "../../../utils/Random.sol";

contract MystikoRollerRegistryTest is Test, Random {
  address public dao;
  MystikoGovernorCenter public center;
  MockMystikoToken public XZK;
  MystikoVoteToken public vXZK;
  MystikoRollerRegistry public registry;

  event RollerMinVoteTokenAmountChanged(uint256 _amount);
  event MinRollupSizeChanged(uint256 _size);
  event RoleGranted(address indexed account);
  event RoleRevoked(address indexed account);

  function setUp() public {
    XZK = new MockMystikoToken();
    vXZK = new MystikoVoteToken(XZK);
    dao = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    center = new MystikoGovernorCenter(dao);
    registry = new MystikoRollerRegistry(address(center), address(vXZK), 1_000_000e18);
  }

  function test_canDoRollup() public {
    address roller = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    address pool = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));

    CanDoRollupParams memory p1 = CanDoRollupParams({pool: pool, roller: roller, rollupSize: 1});
    vm.expectRevert(GovernanceErrors.UnauthorizedRole.selector);
    vm.prank(pool);
    registry.canDoRollup(p1);

    vm.prank(dao);
    registry.grantRole(roller);

    vm.expectRevert(GovernanceErrors.InsufficientBalanceForAction.selector);
    vm.prank(pool);
    registry.canDoRollup(p1);

    uint256 voteAmount = 1_000_000e18;
    XZK.transfer(roller, voteAmount);
    vm.prank(roller);
    XZK.approve(address(vXZK), voteAmount);
    vm.prank(roller);
    vXZK.depositFor(roller, voteAmount);
    vm.prank(pool);
    bool canDo = registry.canDoRollup(p1);
    assertTrue(canDo);

    CanDoRollupParams memory p2 = CanDoRollupParams({pool: pool, roller: roller, rollupSize: 0});
    vm.expectRevert(GovernanceErrors.RollupSizeTooSmall.selector);
    vm.prank(pool);
    registry.canDoRollup(p2);

    vm.prank(dao);
    registry.revokeRole(roller);

    vm.expectRevert(GovernanceErrors.UnauthorizedRole.selector);
    vm.prank(pool);
    registry.canDoRollup(p1);

    vm.prank(dao);
    registry.grantRole(address(0));

    bool canDo2 = registry.canDoRollup(p1);
    assertTrue(canDo2);
  }

  function test_canDoRollup_with_zero_token() public {
    MystikoRollerRegistry registryZero = new MystikoRollerRegistry(address(center), address(vXZK), 0);

    address roller = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    address pool = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));

    CanDoRollupParams memory p1 = CanDoRollupParams({pool: pool, roller: roller, rollupSize: 1});
    vm.expectRevert(GovernanceErrors.UnauthorizedRole.selector);
    vm.prank(pool);
    registryZero.canDoRollup(p1);

    vm.prank(dao);
    registryZero.grantRole(roller);

    vm.prank(pool);
    bool canDo = registryZero.canDoRollup(p1);
    assertTrue(canDo);
  }

  function test_changeRollerMinVoteTokenAmount() public {
    address operator = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    vm.expectRevert(GovernanceErrors.OnlyMystikoDAO.selector);
    vm.prank(operator);
    registry.changeRollerMinVoteTokenAmount(1_000_000e18);

    vm.expectRevert(GovernanceErrors.NotChanged.selector);
    vm.prank(dao);
    registry.changeRollerMinVoteTokenAmount(1_000_000e18);

    vm.expectEmit(address(registry));
    emit RollerMinVoteTokenAmountChanged(2_000_000e18);
    vm.prank(dao);
    registry.changeRollerMinVoteTokenAmount(2_000_000e18);
    assertEq(registry.minVoteTokenAmount(), 2_000_000e18);
  }

  function test_changeMinRollupSize() public {
    address operator = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    vm.expectRevert(GovernanceErrors.OnlyMystikoDAO.selector);
    vm.prank(operator);
    registry.changeMinRollupSize(1);

    vm.expectRevert(GovernanceErrors.NotChanged.selector);
    vm.prank(dao);
    registry.changeMinRollupSize(1);

    vm.expectEmit(address(registry));
    emit MinRollupSizeChanged(2);
    vm.prank(dao);
    registry.changeMinRollupSize(2);
    assertEq(registry.minRollupSize(), 2);
  }

  function test_grant_and_revoke_roller() public {
    address roller = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    assertFalse(registry.hasRole(roller));

    vm.expectRevert(GovernanceErrors.OnlyMystikoDAO.selector);
    registry.grantRole(roller);

    vm.expectEmit(address(registry));
    emit RoleGranted(roller);
    vm.prank(dao);
    registry.grantRole(roller);
    assertTrue(registry.hasRole(roller));

    vm.expectRevert(GovernanceErrors.OnlyMystikoDAO.selector);
    registry.revokeRole(roller);

    vm.expectEmit(address(registry));
    emit RoleRevoked(roller);
    vm.prank(dao);
    registry.revokeRole(roller);
    assertFalse(registry.hasRole(roller));
  }

  function test_grant_and_revoke_rollers() public {
    address roller1 = address(0);
    address roller2 = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    assertFalse(registry.hasRole(roller1));
    assertFalse(registry.hasRole(roller2));

    address[] memory rollers = new address[](2);
    rollers[0] = roller1;
    rollers[1] = roller2;
    vm.expectRevert(GovernanceErrors.OnlyMystikoDAO.selector);
    registry.grantRoles(rollers);

    vm.expectEmit(address(registry));
    emit RoleGranted(roller1);
    emit RoleGranted(roller2);
    vm.prank(dao);
    registry.grantRoles(rollers);
    assertTrue(registry.hasRole(roller1));
    assertTrue(registry.hasRole(roller2));

    vm.expectRevert(GovernanceErrors.OnlyMystikoDAO.selector);
    registry.revokeRoles(rollers);

    vm.expectEmit(address(registry));
    emit RoleRevoked(roller1);
    emit RoleRevoked(roller2);
    vm.prank(dao);
    registry.revokeRoles(rollers);
    assertFalse(registry.hasRole(roller1));
    assertFalse(registry.hasRole(roller2));
  }
}
