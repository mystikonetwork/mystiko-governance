// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import "../../../../contracts/token/MystikoVoteToken.sol";
import "../../../mock/MockMystikoToken.sol";
import "../../../../contracts/Settings/miner/impl/MystikoRelayerRegistry.sol";
import "../../../../contracts/Settings/miner/interfaces/IMystikoRelayerRegistry.sol";
import "../../../../contracts/governance/impl/MystikoGovernorCenter.sol";
import "../../../../contracts/libs/common/CustomErrors.sol";
import "../../../utils/Random.sol";

contract MystikoRelayerRegistryTest is Test, Random {
  address public dao;
  MystikoGovernorCenter public center;
  MockMystikoToken public XZK;
  MystikoVoteToken public vXZK;
  MystikoRelayerRegistry public registry;

  event MinVoteTokenAmountChanged(uint256 _amount);
  event MinRollupSizeChanged(uint256 _size);
  event RelayerAdded(address indexed _relayer);
  event RelayerRemoved(address indexed _relayer);

  function setUp() public {
    XZK = new MockMystikoToken();
    vXZK = new MystikoVoteToken(XZK);
    dao = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    center = new MystikoGovernorCenter(dao);
    registry = new MystikoRelayerRegistry(address(center), address(vXZK));
  }

  function test_canDoRelay() public {
    address relayer = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    address pool = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));

    CanDoRelayParams memory p1 = CanDoRelayParams({pool: pool, relayer: relayer});
    vm.expectRevert(CustomErrors.NotRelayer.selector);
    vm.prank(pool);
    registry.canDoRelay(p1);

    vm.prank(dao);
    address[] memory newRelayers = new address[](1);
    newRelayers[0] = relayer;
    registry.addRelayers(newRelayers);

    vm.expectRevert(CustomErrors.InsufficientBalanceForAction.selector);
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
    address[] memory oldRelayers = new address[](1);
    oldRelayers[0] = relayer;
    registry.removeRelayers(oldRelayers);

    vm.expectRevert(CustomErrors.NotRelayer.selector);
    vm.prank(pool);
    registry.canDoRelay(p1);

    vm.prank(dao);
    address[] memory newRelayers2 = new address[](1);
    newRelayers2[0] = address(0);
    registry.addRelayers(newRelayers2);

    bool canDo2 = registry.canDoRelay(p1);
    assertTrue(canDo2);
  }

  function test_changeMinVoteTokenAmount() public {
    address operator = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    vm.expectRevert(CustomErrors.OnlyMystikoDAO.selector);
    vm.prank(operator);
    registry.changeMinVoteTokenAmount(100_000e18);

    vm.expectRevert(CustomErrors.NotChanged.selector);
    vm.prank(dao);
    registry.changeMinVoteTokenAmount(100_000e18);

    vm.expectEmit(address(registry));
    emit MinVoteTokenAmountChanged(200_000e18);
    vm.prank(dao);
    registry.changeMinVoteTokenAmount(200_000e18);
    assertEq(registry.minVoteTokenAmount(), 200_000e18);
  }

  function test_add_and_remove_Relayers() public {
    address Relayer1 = address(0);
    address Relayer2 = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    assertFalse(registry.isRelayer(Relayer1));
    assertFalse(registry.isRelayer(Relayer2));

    address[] memory Relayers = new address[](2);
    Relayers[0] = Relayer1;
    Relayers[1] = Relayer2;
    vm.expectRevert(CustomErrors.OnlyMystikoDAO.selector);
    registry.addRelayers(Relayers);

    vm.expectEmit(address(registry));
    emit RelayerAdded(Relayer1);
    emit RelayerAdded(Relayer2);
    vm.prank(dao);
    registry.addRelayers(Relayers);
    assertTrue(registry.isRelayer(Relayer1));
    assertTrue(registry.isRelayer(Relayer2));

    vm.expectRevert(CustomErrors.OnlyMystikoDAO.selector);
    registry.removeRelayers(Relayers);

    vm.expectEmit(address(registry));
    emit RelayerRemoved(Relayer1);
    emit RelayerRemoved(Relayer2);
    vm.prank(dao);
    registry.removeRelayers(Relayers);
    assertFalse(registry.isRelayer(Relayer1));
    assertFalse(registry.isRelayer(Relayer2));
  }
}
