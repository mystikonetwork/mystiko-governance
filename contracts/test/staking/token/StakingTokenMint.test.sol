// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {Test} from "forge-std/Test.sol";

import "../../../contracts/staking/impl/StakingToken.sol";
import "../../../contracts/staking/libs/common/CustomErrors.sol";
import "../../../contracts/token/MstkoToken.sol";

contract StakingTokenMintTest is Test {
  MstkoToken public mstko;
  StMstkoToken public stMstko;

  event StMstkoMinted(uint256 amount);

  function setUp() public {
    mstko = new MstkoToken();
    stMstko = new StMstkoToken(address(mstko));
  }

  function test_mint_operator() public {
    vm.expectRevert(CustomErrors.OnlyMinter.selector);
    stMstko.mint(address(this), 100, 100);
  }

  function test_mint_success() public {
    stMstko.changeMinter(address(this));

    vm.expectEmit(address(stMstko));
    emit StMstkoMinted(uint256(0));
    stMstko.mint(address(this), 0, 0);
    assertEq(stMstko.balanceOf(address(this)), 0);

    mstko.approve(address(stMstko), 100);
    vm.expectEmit(address(stMstko));
    emit StMstkoMinted(uint256(100));
    stMstko.mint(address(this), 100, 100);
    assertEq(mstko.balanceOf(address(stMstko)), 100);
    assertEq(stMstko.balanceOf(address(this)), 100);
    assertEq(stMstko.totalSupply(), 100);

    mstko.approve(address(stMstko), 100);
    stMstko.mint(address(this), 0, 100);
    assertEq(mstko.balanceOf(address(stMstko)), 200);
    assertEq(stMstko.balanceOf(address(this)), 100);
    assertEq(stMstko.totalSupply(), 100);

    stMstko.mint(address(this), 100, 0);
    assertEq(mstko.balanceOf(address(stMstko)), 200);
    assertEq(stMstko.balanceOf(address(this)), 200);
    assertEq(stMstko.totalSupply(), 200);
  }
}
