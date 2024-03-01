// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";

import "@openzeppelin/contracts/utils/Pausable.sol";
import "../../../contracts/staking/impl/StakingAction.sol";
import "../../../contracts/staking/libs/common/CustomErrors.sol";
import "../../../contracts/staking/mock/MockMystikoToken.sol";
import "../../../contracts/staking/impl/StakingToken.sol";
import "../utils/Random.sol";

contract StakingActionPauseTest is Test, Random {
  StakingAction public action;
  MockMystikoToken public XZK;
  StMystikoToken public stXZK;

  event Paused(address account);
  event Unpaused(address account);

  function setUp() public {
    XZK = new MockMystikoToken();
    stXZK = new StMystikoToken(address(XZK));
    action = new StakingAction(address(XZK), address(stXZK));
  }

  function test_change_pause_status() public {
    vm.expectEmit(address(action));
    emit Paused(address(this));
    action.pause();

    vm.expectRevert();
    action.pause();

    vm.expectEmit(address(action));
    emit Unpaused(address(this));
    action.unpause();

    vm.expectRevert();
    action.unpause();
  }

  function test_pause_not_owner() public {
    address account = vm.addr(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    vm.prank(account);
    vm.expectRevert();
    action.pause();

    vm.prank(account);
    vm.expectRevert();
    action.unpause();
  }
}
