// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import "../../contracts/token/MystikoVoteToken.sol";
import "../mock/MockMystikoToken.sol";
import "../utils/Random.sol";

contract MystikoVoteTokenTest is Test, Random {
  MockMystikoToken public XZK;
  MystikoVoteToken public vXZK;

  function setUp() public {
    XZK = new MockMystikoToken();
    vXZK = new MystikoVoteToken(XZK);
  }

  function test_decimal() public {
    assertEq(vXZK.decimals(), 18);
  }

  function test_deposit_and_withdraw() public {
    address account = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));

    uint256 amount = 1 ether;
    XZK.transfer(account, amount);
    assertEq(XZK.balanceOf(account), amount);

    vm.prank(account);
    XZK.approve(address(vXZK), amount);
    vm.prank(account);
    vXZK.depositFor(account, amount);
    assertEq(XZK.balanceOf(account), 0);
    assertEq(vXZK.balanceOf(account), amount);

    vm.prank(account);
    vXZK.withdrawTo(account, amount);
    assertEq(XZK.balanceOf(account), amount);
    assertEq(vXZK.balanceOf(account), 0);
  }

  function test_vote() public {
    address account = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    uint256 amount = 1000;

    XZK.transfer(account, amount);
    vm.prank(account);
    XZK.approve(address(vXZK), amount);
    vm.prank(account);
    vXZK.depositFor(account, amount);
    uint256 b = vXZK.balanceOf(account);
    assertEq(b, amount);

    vm.prank(account);
    vXZK.delegate(account);
    uint256 vote = vXZK.getVotes(account);
    assertEq(vote, amount);

    vm.warp(block.timestamp + 1);
    vm.roll(block.number + 1);
    vote = vXZK.getPastVotes(account, vXZK.clock() - 1);
    assertEq(vote, amount);
  }
}
