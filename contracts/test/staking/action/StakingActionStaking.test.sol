// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";

import "../../../contracts/staking/impl/StakingAction.sol";
import "../../../contracts/staking/libs/common/CustomErrors.sol";
import "../../../contracts/staking/mock/MockMystikoToken.sol";
import "../../../contracts/staking/impl/StakingToken.sol";
import "../utils/Random.sol";

contract StakingActionStakingTest is Test, Random {
  StakingAction public action;
  MockMystikoToken public XZK;
  StMystikoToken public stXZK;

  function setUp() public {
    XZK = new MockMystikoToken();
    stXZK = new StMystikoToken(address(XZK));
    action = new StakingAction(address(XZK), address(stXZK));
    stXZK.grantRole(stXZK.STAKING_TOKEN_MINTER_ROLE(), address(action));
  }

  function test_staking_revert() public {
    address account = vm.addr(uint160(uint256(keccak256(abi.encodePacked(_random())))));

    vm.prank(account);
    vm.expectRevert();
    action.stake(1 ether);

    vm.prank(account);
    XZK.approve(address(action), 1 ether);
    vm.prank(account);
    vm.expectRevert();
    action.stake(1 ether);

    XZK.transfer(account, 1 ether);
    XZK.approve(address(action), 1 ether);
    action.pause();
    vm.expectRevert();
    action.stake(1 ether);

    action.unpause();
    action.stake(1 ether);
  }

  function test_withdraw_revert() public {
    address account = vm.addr(uint160(uint256(keccak256(abi.encodePacked(_random())))));

    vm.prank(account);
    vm.expectRevert();
    action.withdraw(1 ether);

    XZK.transfer(account, 1 ether);
    XZK.approve(address(action), 1 ether);
    action.stake(1 ether);
    action.pause();
    vm.expectRevert();
    action.withdraw(1 ether);

    action.unpause();
    action.withdraw(1 ether);
  }

  function test_stake_and_withdraw() public {
    address account = vm.addr(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    vm.prank(account);
    XZK.approve(address(action), 1 ether);
    XZK.transfer(account, 1 ether);
    vm.prank(account);
    action.stake(1 ether);
    assertEq(XZK.balanceOf(account), 0);
    assertEq(XZK.balanceOf(address(stXZK)), 1 ether);
    assertEq(stXZK.totalSupply(), 1 ether);
    assertEq(stXZK.balanceOf(account), 1 ether);

    vm.prank(account);
    action.stake(0);
    assertEq(XZK.balanceOf(account), 0);
    assertEq(XZK.balanceOf(address(stXZK)), 1 ether);
    assertEq(stXZK.totalSupply(), 1 ether);
    assertEq(stXZK.balanceOf(account), 1 ether);

    vm.prank(account);
    action.withdraw(0);
    assertEq(XZK.balanceOf(account), 0);
    assertEq(XZK.balanceOf(address(stXZK)), 1 ether);
    assertEq(stXZK.totalSupply(), 1 ether);
    assertEq(stXZK.balanceOf(account), 1 ether);

    vm.prank(account);
    action.withdraw(0.5 ether);
    assertEq(XZK.balanceOf(account), 0.5 ether);
    assertEq(XZK.balanceOf(address(stXZK)), 0.5 ether);
    assertEq(stXZK.totalSupply(), 0.5 ether);
    assertEq(stXZK.balanceOf(account), 0.5 ether);

    vm.prank(account);
    action.withdraw(0.5 ether);
    assertEq(XZK.balanceOf(account), 1 ether);
    assertEq(XZK.balanceOf(address(stXZK)), 0);
    assertEq(stXZK.totalSupply(), 0);
    assertEq(stXZK.balanceOf(account), 0);
  }

  function test_staking_two_account() public {
    address account1 = vm.addr(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    address account2 = vm.addr(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    XZK.transfer(account1, 1 ether);
    XZK.transfer(account2, 1 ether);

    for (uint i = 0; i < 5; i++) {
      vm.prank(account1);
      XZK.approve(address(action), 1 ether);
      vm.prank(account1);
      action.stake(1 ether);
      assertEq(XZK.balanceOf(account1), (1 ether) * i);
      assertEq(XZK.balanceOf(address(stXZK)), 1 ether);
      assertEq(stXZK.totalSupply(), 1 ether);
      assertEq(stXZK.balanceOf(account1), 1 ether);
      assertEq(stXZK.balanceOf(account2), 0);

      vm.prank(account2);
      XZK.approve(address(action), 1 ether);
      vm.prank(account2);
      action.stake(1 ether);
      assertEq(XZK.balanceOf(account2), (1 ether) * i);
      assertEq(XZK.balanceOf(address(stXZK)), 2 ether);
      assertEq(stXZK.totalSupply(), 2 ether);
      assertEq(stXZK.balanceOf(account1), 1 ether);
      assertEq(stXZK.balanceOf(account2), 1 ether);

      XZK.transfer(address(stXZK), 2 ether);

      vm.prank(account1);
      action.withdraw(1 ether);
      assertEq(XZK.balanceOf(account1), (1 ether) * (i + 2));
      assertEq(XZK.balanceOf(address(stXZK)), 2 ether);
      assertEq(stXZK.totalSupply(), 1 ether);
      assertEq(stXZK.balanceOf(account1), 0);
      assertEq(stXZK.balanceOf(account2), 1 ether);

      vm.prank(account2);
      action.withdraw(1 ether);
      assertEq(XZK.balanceOf(account2), (1 ether) * (i + 2));
      assertEq(XZK.balanceOf(address(stXZK)), 0);
      assertEq(stXZK.totalSupply(), 0);
      assertEq(stXZK.balanceOf(account1), 0);
      assertEq(stXZK.balanceOf(account2), 0);
    }
  }

  function test_staking_diff_amount() public {
    address account1 = vm.addr(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    address account2 = vm.addr(uint160(uint256(keccak256(abi.encodePacked(_random() + 1)))));
    XZK.transfer(account1, 100 ether);
    XZK.transfer(account2, 0.01 ether);

    vm.prank(account1);
    XZK.approve(address(action), 100 ether);
    vm.prank(account1);
    action.stake(100 ether);
    assertEq(XZK.balanceOf(account1), 0);
    assertEq(XZK.balanceOf(address(stXZK)), 100 ether);
    assertEq(stXZK.totalSupply(), 100 ether);
    assertEq(stXZK.balanceOf(account1), 100 ether);
    assertEq(stXZK.balanceOf(account2), 0);

    vm.prank(account2);
    XZK.approve(address(action), 0.01 ether);
    vm.prank(account2);
    action.stake(0.01 ether);
    assertEq(XZK.balanceOf(account2), 0);
    assertEq(XZK.balanceOf(address(stXZK)), 100.01 ether);
    assertEq(stXZK.totalSupply(), 100.01 ether);
    assertEq(stXZK.balanceOf(account1), 100 ether);
    assertEq(stXZK.balanceOf(account2), 0.01 ether);

    XZK.transfer(address(stXZK), 2 ether);

    vm.prank(account1);
    action.withdraw(1 ether);
    uint256 balanceAccount1 = 1019998000199980001;
    uint256 balancePool1 = (102.01 ether) - 1019998000199980001;
    assertEq(XZK.balanceOf(account1), balanceAccount1);
    assertEq(XZK.balanceOf(address(stXZK)), balancePool1);
    assertEq(stXZK.totalSupply(), 99.01 ether);
    assertEq(stXZK.balanceOf(account1), 99 ether);
    assertEq(stXZK.balanceOf(account2), 0.01 ether);

    vm.prank(account2);
    action.withdraw(0.01 ether);
    uint256 balanceAccount2 = 10199980001999800;
    uint256 balancePool2 = balancePool1 - balanceAccount2;
    assertEq(XZK.balanceOf(account2), balanceAccount2);
    assertEq(XZK.balanceOf(address(stXZK)), balancePool2);
    assertEq(stXZK.totalSupply(), 99 ether);
    assertEq(stXZK.balanceOf(account1), 99 ether);
    assertEq(stXZK.balanceOf(account2), 0 ether);

    vm.prank(account1);
    action.withdraw(99 ether);
    assertEq(XZK.balanceOf(account1), balanceAccount1 + balancePool2);
    assertEq(XZK.balanceOf(address(stXZK)), 0);
    assertEq(stXZK.totalSupply(), 0 ether);
    assertEq(stXZK.balanceOf(account1), 0 ether);
    assertEq(stXZK.balanceOf(account2), 0 ether);
  }
}
