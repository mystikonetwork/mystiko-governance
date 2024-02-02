// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {Test} from "forge-std/Test.sol";

import "../../../contracts/staking/impl/StakingAction.sol";
import "../../../contracts/staking/libs/common/CustomErrors.sol";
import "../../../contracts/token/MstkoToken.sol";
import "../../../contracts/staking/impl/StakingToken.sol";

contract StakingActionSwapTest is Test {
  StakingAction public action;
  MstkoToken public mstko;
  StMstkoToken public stMstko;

  function setUp() public {
    mstko = new MstkoToken();
    stMstko = new StMstkoToken(address(mstko));
    action = new StakingAction(address(mstko), address(stMstko));
  }

  function test_swap_reward_before_staking() public {
    assertEq(action.swapStMstko(0), 0);
    assertEq(action.swapMstko(0), 0);
    assertEq(action.swapStMstko(1), 1);
    assertEq(action.swapMstko(1), 1);
    assertEq(action.swapStMstko(1000000000), 1000000000);
    assertEq(action.swapMstko(1000000000), 1000000000);

    mstko.transfer(address(stMstko), 100);
    assertEq(action.swapStMstko(1), 1);
    assertEq(action.swapMstko(1), 1);

    stMstko.changeMinter(address(this));
    mstko.approve(address(stMstko), 100);
    stMstko.mint(address(this), 100, 100);
    assertEq(action.swapStMstko(1), 0);
    assertEq(action.swapMstko(1), 2);
    assertEq(action.swapStMstko(10), 5);
    assertEq(action.swapMstko(5), 10);
    assertEq(action.swapStMstko(100), 50);
    assertEq(action.swapMstko(50), 100);

    mstko.transfer(address(stMstko), 100);
    assertEq(action.swapStMstko(1), 0);
    assertEq(action.swapMstko(1), 3);
    assertEq(action.swapStMstko(10), 3);
    assertEq(action.swapMstko(10), 30);
    assertEq(action.swapStMstko(100), 33);
    assertEq(action.swapMstko(100), 300);
    assertEq(action.swapStMstko(1000), 333);
    assertEq(action.swapMstko(1000), 3000);
  }

  function test_swap_staking_before_reward() public {
    stMstko.changeMinter(address(this));
    mstko.approve(address(stMstko), 100);
    stMstko.mint(address(this), 100, 100);
    assertEq(action.swapStMstko(0), 0);
    assertEq(action.swapMstko(0), 0);
    assertEq(action.swapStMstko(1), 1);
    assertEq(action.swapMstko(1), 1);
    assertEq(action.swapStMstko(1000000000), 1000000000);
    assertEq(action.swapMstko(1000000000), 1000000000);

    mstko.transfer(address(stMstko), 100);
    assertEq(action.swapStMstko(1), 0);
    assertEq(action.swapMstko(1), 2);
    assertEq(action.swapStMstko(10), 5);
    assertEq(action.swapMstko(5), 10);
    assertEq(action.swapStMstko(100), 50);
    assertEq(action.swapMstko(50), 100);

    mstko.transfer(address(stMstko), 100);
    assertEq(action.swapStMstko(1), 0);
    assertEq(action.swapMstko(1), 3);
    assertEq(action.swapStMstko(10), 3);
    assertEq(action.swapMstko(10), 30);
    assertEq(action.swapStMstko(100), 33);
    assertEq(action.swapMstko(100), 300);
    assertEq(action.swapStMstko(1000), 333);
    assertEq(action.swapMstko(1000), 3000);
  }

  function test_swap_more_staking_and_reward() public {
    stMstko.changeMinter(address(this));
    mstko.approve(address(stMstko), 100);
    stMstko.mint(address(this), 100, 100);
    assertEq(action.swapStMstko(0), 0);
    assertEq(action.swapMstko(0), 0);
    assertEq(action.swapStMstko(1), 1);
    assertEq(action.swapMstko(1), 1);
    assertEq(action.swapStMstko(1000000000), 1000000000);
    assertEq(action.swapMstko(1000000000), 1000000000);

    mstko.approve(address(stMstko), 100);
    stMstko.mint(address(this), 100, 100);

    mstko.transfer(address(stMstko), 200);
    assertEq(action.swapStMstko(1), 0);
    assertEq(action.swapMstko(1), 2);
    assertEq(action.swapStMstko(10), 5);
    assertEq(action.swapMstko(10), 20);
    assertEq(action.swapStMstko(100), 50);
    assertEq(action.swapMstko(100), 200);

    mstko.approve(address(stMstko), 200);
    stMstko.mint(address(this), 100, 200);
    mstko.approve(address(stMstko), 200);
    stMstko.mint(address(this), 100, 200);
    assertEq(action.swapStMstko(100), 50);
    assertEq(action.swapMstko(100), 200);
    assertEq(action.swapStMstko(10), 5);
    assertEq(action.swapMstko(10), 20);
    assertEq(action.swapStMstko(100), 50);
    assertEq(action.swapMstko(100), 200);

    mstko.transfer(address(stMstko), 200);
    assertEq(action.swapStMstko(1), 0);
    assertEq(action.swapMstko(1), 2);
    assertEq(action.swapStMstko(10), 4);
    assertEq(action.swapMstko(10), 25);
    assertEq(action.swapStMstko(100), 40);
    assertEq(action.swapMstko(100), 250);
  }
}
