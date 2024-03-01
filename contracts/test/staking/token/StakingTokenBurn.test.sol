// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";

import "../../../contracts/staking/impl/StakingToken.sol";
import "../../../contracts/staking/libs/common/CustomErrors.sol";
import "../../../contracts/staking/mock/MockMystikoToken.sol";
import "../utils/Random.sol";

contract StakingTokenBurnTest is Test, Random {
  MockMystikoToken public XZK;
  StMystikoToken public stXZK;

  event StXZKBurned(address indexed account, uint256 amount);

  function setUp() public {
    XZK = new MockMystikoToken();
    stXZK = new StMystikoToken(address(XZK));
  }

  function test_burn_revert_without_role() public {
    vm.expectRevert();
    stXZK.burn(address(this), 100, 100);
  }

  function test_burn() public {
    address actor = vm.addr(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    address account = vm.addr(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    stXZK.grantRole(stXZK.STAKING_TOKEN_MINTER_ROLE(), address(actor));

    XZK.transfer(address(stXZK), 100);
    assertEq(XZK.balanceOf(address(account)), 0);
    vm.prank(actor);
    stXZK.mint(address(account), 200);
    assertEq(stXZK.balanceOf(address(account)), 200);
    assertEq(stXZK.totalSupply(), 200);
    vm.prank(actor);
    vm.expectEmit(address(stXZK));
    emit StXZKBurned(account, uint256(100));
    stXZK.burn(address(account), 100, 100);
    assertEq(XZK.balanceOf(address(account)), 100);
    assertEq(XZK.balanceOf(address(stXZK)), 0);
    assertEq(stXZK.balanceOf(address(account)), 100);
    assertEq(stXZK.totalSupply(), 100);

    vm.prank(actor);
    vm.expectRevert();
    stXZK.burn(address(account), 100, 100);
    assertEq(XZK.balanceOf(address(account)), 100);
    assertEq(XZK.balanceOf(address(stXZK)), 0);
    assertEq(stXZK.balanceOf(address(account)), 100);
    assertEq(stXZK.totalSupply(), 100);

    XZK.transfer(address(stXZK), 100);
    vm.prank(actor);
    vm.expectEmit(address(stXZK));
    emit StXZKBurned(account, uint256(100));
    stXZK.burn(address(account), 100, 100);
    assertEq(XZK.balanceOf(address(account)), 200);
    assertEq(XZK.balanceOf(address(stXZK)), 0);
    assertEq(stXZK.balanceOf(address(account)), 0);
    assertEq(stXZK.totalSupply(), 0);
  }

  function test_mint_and_burn() public {
    address actor = vm.addr(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    address account1 = vm.addr(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    address account2 = vm.addr(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    stXZK.grantRole(stXZK.STAKING_TOKEN_MINTER_ROLE(), address(actor));

    assertEq(XZK.balanceOf(address(account1)), 0);
    assertEq(XZK.balanceOf(address(account2)), 0);
    assertEq(stXZK.balanceOf(address(account1)), 0);
    assertEq(stXZK.balanceOf(address(account2)), 0);

    vm.prank(actor);
    stXZK.mint(address(account1), 200);
    vm.prank(actor);
    stXZK.mint(address(account2), 200);
    assertEq(stXZK.balanceOf(address(account1)), 200);
    assertEq(stXZK.balanceOf(address(account2)), 200);
    assertEq(stXZK.totalSupply(), 400);

    XZK.transfer(address(stXZK), 100);

    vm.prank(actor);
    stXZK.burn(address(account1), 100, 50);
    vm.prank(actor);
    stXZK.burn(address(account2), 100, 50);
    assertEq(XZK.balanceOf(address(account1)), 50);
    assertEq(XZK.balanceOf(address(account2)), 50);
    assertEq(stXZK.balanceOf(address(account1)), 100);
    assertEq(stXZK.balanceOf(address(account2)), 100);
    assertEq(stXZK.totalSupply(), 200);
  }
}
