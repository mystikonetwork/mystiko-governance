// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {Test} from "forge-std/Test.sol";

import "../../../contracts/staking/impl/StakingAction.sol";
import "../../../contracts/staking/libs/common/CustomErrors.sol";
import "../../../contracts/token/MstkoToken.sol";
import "../../../contracts/staking/impl/StakingToken.sol";

contract StakingActionPauseTest is Test {
  StakingAction public action;
  MstkoToken public mstko;
  StMstkoToken public stMstko;

  event Paused(address account);
  event Unpaused(address account);

  function setUp() public {
    mstko = new MstkoToken();
    stMstko = new StMstkoToken(address(mstko));
    action = new StakingAction(address(mstko), address(stMstko));
  }

  function test_change_pause_status() public {
    vm.expectEmit(address(action));
    emit Paused(address(this));
    action.pause();

    vm.expectRevert("Pausable: paused");
    action.pause();

    vm.expectEmit(address(action));
    emit Unpaused(address(this));
    action.unpause();

    vm.expectRevert("Pausable: not paused");
    action.unpause();
  }

  function test_pause_not_owner() public {
    address account = vm.addr(uint160(uint256(keccak256(abi.encodePacked(block.timestamp)))));
    vm.prank(account);
    vm.expectRevert("Ownable: caller is not the owner");
    action.pause();

    vm.prank(account);
    vm.expectRevert("Ownable: caller is not the owner");
    action.unpause();
  }
}
