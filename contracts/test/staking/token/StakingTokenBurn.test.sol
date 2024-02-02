// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {Test} from "forge-std/Test.sol";

import "../../../contracts/staking/impl/StakingToken.sol";
import "../../../contracts/staking/libs/common/CustomErrors.sol";
import "../../../contracts/token/MstkoToken.sol";

contract StakingTokenBurnTest is Test {
  MstkoToken public mstko;
  StMstkoToken public stMstko;

  event StMstkoBurned(uint256 amount);

  function setUp() public {
    mstko = new MstkoToken();
    stMstko = new StMstkoToken(address(mstko));
  }

  function test_burn_operator() public {
    vm.expectRevert(CustomErrors.OnlyMinter.selector);
    stMstko.burn(address(this), 100, 100);
  }

  function test_burn_success() public {
    address account = vm.addr(uint160(uint256(keccak256(abi.encodePacked(block.timestamp)))));
    stMstko.changeMinter(address(account));
    vm.prank(account);
    vm.expectRevert("ERC20: burn amount exceeds balance");
    stMstko.burn(address(account), 100, 100);

    mstko.transfer(address(account), 100);
    assertEq(mstko.balanceOf(address(account)), 100);
    vm.prank(account);
    mstko.approve(address(stMstko), 100);
    vm.prank(account);
    stMstko.mint(address(account), 100, 100);
    assertEq(mstko.balanceOf(address(account)), 0);
    assertEq(mstko.balanceOf(address(stMstko)), 100);
    assertEq(stMstko.balanceOf(address(account)), 100);
    assertEq(stMstko.totalSupply(), 100);

    vm.prank(account);
    vm.expectEmit(address(stMstko));
    emit StMstkoBurned(uint256(0));
    stMstko.burn(address(account), 0, 0);
    assertEq(mstko.balanceOf(address(account)), 0);
    assertEq(mstko.balanceOf(address(stMstko)), 100);
    assertEq(stMstko.balanceOf(address(account)), 100);
    assertEq(stMstko.totalSupply(), 100);

    vm.prank(account);
    vm.expectEmit(address(stMstko));
    emit StMstkoBurned(uint256(100));
    stMstko.burn(address(account), 100, 100);
    assertEq(mstko.balanceOf(address(account)), 100);
    assertEq(mstko.balanceOf(address(stMstko)), 0);
    assertEq(stMstko.balanceOf(address(account)), 0);
    assertEq(stMstko.totalSupply(), 0);

    mstko.transfer(address(account), 300);
    assertEq(mstko.balanceOf(address(account)), 400);
    vm.prank(account);
    mstko.approve(address(stMstko), 200);
    vm.prank(account);
    stMstko.mint(address(account), 100, 200);
    assertEq(mstko.balanceOf(address(account)), 200);
    assertEq(mstko.balanceOf(address(stMstko)), 200);
    assertEq(stMstko.balanceOf(address(account)), 100);
    assertEq(stMstko.totalSupply(), 100);

    vm.prank(account);
    vm.expectRevert("ERC20: insufficient allowance");
    stMstko.mint(address(account), 100, 200);
    vm.prank(account);
    mstko.approve(address(stMstko), 200);
    vm.prank(account);
    stMstko.mint(address(account), 100, 200);
    assertEq(mstko.balanceOf(address(account)), 0);
    assertEq(mstko.balanceOf(address(stMstko)), 400);
    assertEq(stMstko.balanceOf(address(account)), 200);
    assertEq(stMstko.totalSupply(), 200);

    vm.prank(account);
    stMstko.burn(address(account), 100, 150);
    assertEq(mstko.balanceOf(address(account)), 150);
    assertEq(mstko.balanceOf(address(stMstko)), 250);
    assertEq(stMstko.balanceOf(address(account)), 100);
    assertEq(stMstko.totalSupply(), 100);

    vm.prank(account);
    vm.expectRevert("ERC20: burn amount exceeds balance");
    stMstko.burn(address(account), 200, 150);

    vm.prank(account);
    vm.expectRevert("ERC20: transfer amount exceeds balance");
    stMstko.burn(address(account), 100, 350);

    vm.prank(account);
    stMstko.burn(address(account), 100, 250);
    assertEq(mstko.balanceOf(address(account)), 400);
    assertEq(mstko.balanceOf(address(stMstko)), 0);
    assertEq(stMstko.balanceOf(address(account)), 0);
    assertEq(stMstko.totalSupply(), 0);
  }
}
