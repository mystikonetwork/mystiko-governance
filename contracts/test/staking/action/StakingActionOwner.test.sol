// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {Test} from "forge-std/Test.sol";

import "../../../contracts/staking/impl/StakingAction.sol";
import "../../../contracts/staking/libs/common/CustomErrors.sol";
import "../../../contracts/token/MstkoToken.sol";
import "../../../contracts/staking/impl/StakingToken.sol";

contract StakingActionOwnerTest is Test {
  StakingAction public action;
  MstkoToken public mstko;
  StMstkoToken public stMstko;

  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

  function setUp() public {
    mstko = new MstkoToken();
    stMstko = new StMstkoToken(address(mstko));
    action = new StakingAction(address(mstko), address(stMstko));
  }

  function test_change_owner() public {
    vm.expectRevert("Ownable: new owner is the zero address");
    stMstko.transferOwnership(address(0));

    vm.prank(address(0));
    vm.expectRevert("Ownable: caller is not the owner");
    stMstko.transferOwnership(address(this));

    vm.expectEmit(address(stMstko));
    emit OwnershipTransferred(address(this), address(0xf));
    stMstko.transferOwnership(address(0xf));
  }
}
