// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import "../../../../contracts/token/MystikoVoteToken.sol";
import "../../../mock/MockMystikoToken.sol";
import "../../../../contracts/Settings/miner/impl/MystikoRollerRegistry.sol";
import "../../../../contracts/Settings/miner/interfaces/IMystikoRollerRegistry.sol";
import "../../../../contracts/governance/impl/MystikoGovernorCenter.sol";
import "../../../../contracts/libs/common/CustomErrors.sol";
import "../../../utils/Random.sol";

contract MystikoRollerRegistryTest is Test, Random {
  address public dao;
  MystikoGovernorCenter public center;
  MockMystikoToken public XZK;
  MystikoVoteToken public vXZK;
  MystikoRollerRegistry public registry;

  event MinVoteTokenAmountChanged(uint256 _amount);
  event MinRollupSizeChanged(uint256 _size);
  event RollerAdded(address indexed _relayer);
  event RollerRemoved(address indexed _relayer);

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
    vm.expectRevert(CustomErrors.NotRoller.selector);
    vm.prank(pool);
    registry.canDoRollup(p1);

    vm.prank(dao);
    address[] memory newRollers = new address[](1);
    newRollers[0] = roller;
    registry.addRollers(newRollers);

    vm.expectRevert(CustomErrors.InsufficientBalanceForAction.selector);
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
    vm.expectRevert(CustomErrors.RollupSizeTooSmall.selector);
    vm.prank(pool);
    registry.canDoRollup(p2);

    vm.prank(dao);
    address[] memory oldRollers = new address[](1);
    oldRollers[0] = roller;
    registry.removeRollers(oldRollers);

    vm.expectRevert(CustomErrors.NotRoller.selector);
    vm.prank(pool);
    registry.canDoRollup(p1);

    vm.prank(dao);
    address[] memory newRollers2 = new address[](1);
    newRollers2[0] = address(0);
    registry.addRollers(newRollers2);

    bool canDo2 = registry.canDoRollup(p1);
    assertTrue(canDo2);
  }

  function test_canDoRollup_with_zero_token() public {
    MystikoRollerRegistry registryZero = new MystikoRollerRegistry(address(center), address(vXZK), 0);

    address roller = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    address pool = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));

    CanDoRollupParams memory p1 = CanDoRollupParams({pool: pool, roller: roller, rollupSize: 1});
    vm.expectRevert(CustomErrors.NotRoller.selector);
    vm.prank(pool);
    registryZero.canDoRollup(p1);

    vm.prank(dao);
    address[] memory newRollers = new address[](1);
    newRollers[0] = roller;
    registryZero.addRollers(newRollers);

    vm.prank(pool);
    bool canDo = registryZero.canDoRollup(p1);
    assertTrue(canDo);
  }

  function test_changeMinVoteTokenAmount() public {
    address operator = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    vm.expectRevert(CustomErrors.OnlyMystikoDAO.selector);
    vm.prank(operator);
    registry.changeMinVoteTokenAmount(1_000_000e18);

    vm.expectRevert(CustomErrors.NotChanged.selector);
    vm.prank(dao);
    registry.changeMinVoteTokenAmount(1_000_000e18);

    vm.expectEmit(address(registry));
    emit MinVoteTokenAmountChanged(2_000_000e18);
    vm.prank(dao);
    registry.changeMinVoteTokenAmount(2_000_000e18);
    assertEq(registry.minVoteTokenAmount(), 2_000_000e18);
  }

  function test_changeMinRollupSize() public {
    address operator = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    vm.expectRevert(CustomErrors.OnlyMystikoDAO.selector);
    vm.prank(operator);
    registry.changeMinRollupSize(1);

    vm.expectRevert(CustomErrors.NotChanged.selector);
    vm.prank(dao);
    registry.changeMinRollupSize(1);

    vm.expectEmit(address(registry));
    emit MinRollupSizeChanged(2);
    vm.prank(dao);
    registry.changeMinRollupSize(2);
    assertEq(registry.minRollupSize(), 2);
  }

  function test_add_and_remove_rollers() public {
    address roller1 = address(0);
    address roller2 = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    assertFalse(registry.isRoller(roller1));
    assertFalse(registry.isRoller(roller2));

    address[] memory rollers = new address[](2);
    rollers[0] = roller1;
    rollers[1] = roller2;
    vm.expectRevert(CustomErrors.OnlyMystikoDAO.selector);
    registry.addRollers(rollers);

    vm.expectEmit(address(registry));
    emit RollerAdded(roller1);
    emit RollerAdded(roller2);
    vm.prank(dao);
    registry.addRollers(rollers);
    assertTrue(registry.isRoller(roller1));
    assertTrue(registry.isRoller(roller2));

    vm.expectRevert(CustomErrors.OnlyMystikoDAO.selector);
    registry.removeRollers(rollers);

    vm.expectEmit(address(registry));
    emit RollerRemoved(roller1);
    emit RollerRemoved(roller2);
    vm.prank(dao);
    registry.removeRollers(rollers);
    assertFalse(registry.isRoller(roller1));
    assertFalse(registry.isRoller(roller2));
  }
}
