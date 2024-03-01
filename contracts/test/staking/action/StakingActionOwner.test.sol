// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";

import "../../../contracts/staking/impl/StakingAction.sol";
import "../../../contracts/staking/libs/common/CustomErrors.sol";
import "../../../contracts/staking/mock/MockMystikoToken.sol";
import "../../../contracts/staking/impl/StakingToken.sol";

contract StakingActionOwnerTest is Test {
  StakingAction public action;
  MockMystikoToken public XZK;
  StMystikoToken public stXZK;

  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

  function setUp() public {
    XZK = new MockMystikoToken();
    stXZK = new StMystikoToken(address(XZK));
    action = new StakingAction(address(XZK), address(stXZK));
  }

  function test_change_owner() public {
    vm.expectRevert();
    action.transferOwnership(address(0));

    vm.prank(address(0));
    vm.expectRevert();
    action.transferOwnership(address(this));

    vm.expectEmit(address(action));
    emit OwnershipTransferred(address(this), address(0xf));
    action.transferOwnership(address(0xf));
  }
}
