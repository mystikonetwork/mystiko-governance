// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {Test} from "forge-std/Test.sol";
import "forge-std/console.sol";

import "../../../contracts/staking/impl/StakingAction.sol";
import "../../../contracts/staking/libs/common/CustomErrors.sol";
import "../../../contracts/token/MstkoToken.sol";
import "../../../contracts/staking/impl/StakingToken.sol";

contract StakingActionStakingTest is Test {
  StakingAction public action;
  MstkoToken public mstko;
  StMstkoToken public stMstko;

  function setUp() public {
    mstko = new MstkoToken();
    stMstko = new StMstkoToken(address(mstko));
    action = new StakingAction(address(mstko), address(stMstko));
    stMstko.changeMinter(address(action));
  }

  function test_staking_revert() public {
    address account = vm.addr(uint160(uint256(keccak256(abi.encodePacked(block.timestamp)))));

    vm.prank(account);
    vm.expectRevert("ERC20: insufficient allowance");
    action.stake(1 ether);

    vm.prank(account);
    mstko.approve(address(stMstko), 1 ether);

    vm.prank(account);
    vm.expectRevert("ERC20: transfer amount exceeds balance");
    action.stake(1 ether);

    mstko.transfer(account, 1 ether);
    mstko.approve(address(stMstko), 1 ether);
    action.pause();
    vm.expectRevert("Pausable: paused");
    action.stake(1 ether);

    action.unpause();
    action.stake(1 ether);
  }

  function test_withdraw_revert() public {
    address account = vm.addr(uint160(uint256(keccak256(abi.encodePacked(block.timestamp)))));

    vm.prank(account);
    vm.expectRevert("ERC20: burn amount exceeds balance");
    action.withdraw(1 ether);

    mstko.transfer(account, 1 ether);
    mstko.approve(address(stMstko), 1 ether);
    action.stake(1 ether);
    action.pause();
    vm.expectRevert("Pausable: paused");
    action.withdraw(1 ether);

    action.unpause();
    action.withdraw(1 ether);
  }

  function test_stake_and_withdraw() public {
    address account = vm.addr(uint160(uint256(keccak256(abi.encodePacked(block.timestamp)))));
    vm.prank(account);
    mstko.approve(address(stMstko), 1 ether);
    mstko.transfer(account, 1 ether);
    vm.prank(account);
    action.stake(1 ether);
    assertEq(mstko.balanceOf(account), 0);
    assertEq(mstko.balanceOf(address(stMstko)), 1 ether);
    assertEq(stMstko.totalSupply(), 1 ether);
    assertEq(stMstko.balanceOf(account), 1 ether);

    vm.prank(account);
    action.stake(0);
    assertEq(mstko.balanceOf(account), 0);
    assertEq(mstko.balanceOf(address(stMstko)), 1 ether);
    assertEq(stMstko.totalSupply(), 1 ether);
    assertEq(stMstko.balanceOf(account), 1 ether);

    vm.prank(account);
    action.withdraw(0);
    assertEq(mstko.balanceOf(account), 0);
    assertEq(mstko.balanceOf(address(stMstko)), 1 ether);
    assertEq(stMstko.totalSupply(), 1 ether);
    assertEq(stMstko.balanceOf(account), 1 ether);

    vm.prank(account);
    action.withdraw(0.5 ether);
    assertEq(mstko.balanceOf(account), 0.5 ether);
    assertEq(mstko.balanceOf(address(stMstko)), 0.5 ether);
    assertEq(stMstko.totalSupply(), 0.5 ether);
    assertEq(stMstko.balanceOf(account), 0.5 ether);

    vm.prank(account);
    action.withdraw(0.5 ether);
    assertEq(mstko.balanceOf(account), 1 ether);
    assertEq(mstko.balanceOf(address(stMstko)), 0);
    assertEq(stMstko.totalSupply(), 0);
    assertEq(stMstko.balanceOf(account), 0);
  }

  function test_staking_two_account() public {
    address account1 = vm.addr(uint160(uint256(keccak256(abi.encodePacked(block.timestamp)))));
    address account2 = vm.addr(uint160(uint256(keccak256(abi.encodePacked(block.timestamp + 1)))));
    mstko.transfer(account1, 1 ether);
    mstko.transfer(account2, 1 ether);

    for (uint i = 0; i < 5; i++) {
      vm.prank(account1);
      mstko.approve(address(stMstko), 1 ether);
      vm.prank(account1);
      action.stake(1 ether);
      assertEq(mstko.balanceOf(account1), (1 ether) * i);
      assertEq(mstko.balanceOf(address(stMstko)), 1 ether);
      assertEq(stMstko.totalSupply(), 1 ether);
      assertEq(stMstko.balanceOf(account1), 1 ether);
      assertEq(stMstko.balanceOf(account2), 0);

      vm.prank(account2);
      mstko.approve(address(stMstko), 1 ether);
      vm.prank(account2);
      action.stake(1 ether);
      assertEq(mstko.balanceOf(account2), (1 ether) * i);
      assertEq(mstko.balanceOf(address(stMstko)), 2 ether);
      assertEq(stMstko.totalSupply(), 2 ether);
      assertEq(stMstko.balanceOf(account1), 1 ether);
      assertEq(stMstko.balanceOf(account2), 1 ether);

      mstko.transfer(address(stMstko), 2 ether);

      vm.prank(account1);
      action.withdraw(1 ether);
      assertEq(mstko.balanceOf(account1), (1 ether) * (i + 2));
      assertEq(mstko.balanceOf(address(stMstko)), 2 ether);
      assertEq(stMstko.totalSupply(), 1 ether);
      assertEq(stMstko.balanceOf(account1), 0);
      assertEq(stMstko.balanceOf(account2), 1 ether);

      vm.prank(account2);
      action.withdraw(1 ether);
      assertEq(mstko.balanceOf(account2), (1 ether) * (i + 2));
      assertEq(mstko.balanceOf(address(stMstko)), 0);
      assertEq(stMstko.totalSupply(), 0);
      assertEq(stMstko.balanceOf(account1), 0);
      assertEq(stMstko.balanceOf(account2), 0);
    }
  }

  function test_staking_diff_amount() public {
    address account1 = vm.addr(uint160(uint256(keccak256(abi.encodePacked(block.timestamp)))));
    address account2 = vm.addr(uint160(uint256(keccak256(abi.encodePacked(block.timestamp + 1)))));
    mstko.transfer(account1, 100 ether);
    mstko.transfer(account2, 0.01 ether);

    vm.prank(account1);
    mstko.approve(address(stMstko), 100 ether);
    vm.prank(account1);
    action.stake(100 ether);
    assertEq(mstko.balanceOf(account1), 0);
    assertEq(mstko.balanceOf(address(stMstko)), 100 ether);
    assertEq(stMstko.totalSupply(), 100 ether);
    assertEq(stMstko.balanceOf(account1), 100 ether);
    assertEq(stMstko.balanceOf(account2), 0);

    vm.prank(account2);
    mstko.approve(address(stMstko), 0.01 ether);
    vm.prank(account2);
    action.stake(0.01 ether);
    assertEq(mstko.balanceOf(account2), 0);
    assertEq(mstko.balanceOf(address(stMstko)), 100.01 ether);
    assertEq(stMstko.totalSupply(), 100.01 ether);
    assertEq(stMstko.balanceOf(account1), 100 ether);
    assertEq(stMstko.balanceOf(account2), 0.01 ether);

    mstko.transfer(address(stMstko), 2 ether);

    vm.prank(account1);
    action.withdraw(1 ether);
    uint256 balanceAccount1 = 1019998000199980001;
    uint256 balancePool1 = (102.01 ether) - 1019998000199980001;
    assertEq(mstko.balanceOf(account1), balanceAccount1);
    assertEq(mstko.balanceOf(address(stMstko)), balancePool1);
    assertEq(stMstko.totalSupply(), 99.01 ether);
    assertEq(stMstko.balanceOf(account1), 99 ether);
    assertEq(stMstko.balanceOf(account2), 0.01 ether);

    vm.prank(account2);
    action.withdraw(0.01 ether);
    uint256 balanceAccount2 = 10199980001999800;
    uint256 balancePool2 = balancePool1 - balanceAccount2;
    assertEq(mstko.balanceOf(account2), balanceAccount2);
    assertEq(mstko.balanceOf(address(stMstko)), balancePool2);
    assertEq(stMstko.totalSupply(), 99 ether);
    assertEq(stMstko.balanceOf(account1), 99 ether);
    assertEq(stMstko.balanceOf(account2), 0 ether);

    vm.prank(account1);
    action.withdraw(99 ether);
    assertEq(mstko.balanceOf(account1), balanceAccount1 + balancePool2);
    assertEq(mstko.balanceOf(address(stMstko)), 0);
    assertEq(stMstko.totalSupply(), 0 ether);
    assertEq(stMstko.balanceOf(account1), 0 ether);
    assertEq(stMstko.balanceOf(account2), 0 ether);
  }
}
