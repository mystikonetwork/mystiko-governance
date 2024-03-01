// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";

import "../../../contracts/staking/impl/StakingToken.sol";
import "../../../contracts/staking/libs/common/CustomErrors.sol";
import "../../../contracts/staking/mock/MockMystikoToken.sol";
import "../utils/Random.sol";

contract StakingTokenMintTest is Test, Random {
  MockMystikoToken public XZK;
  StMystikoToken public stXZK;

  event StXZKMinted(address indexed account, uint256 amount);

  function setUp() public {
    XZK = new MockMystikoToken();
    stXZK = new StMystikoToken(address(XZK));
  }

  function test_mint_revert_without_role() public {
    vm.expectRevert();
    stXZK.mint(address(this), 100);
  }

  function test_mint() public {
    address actor = vm.addr(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    address account = vm.addr(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    stXZK.grantRole(stXZK.STAKING_TOKEN_MINTER_ROLE(), actor);

    vm.prank(actor);
    vm.expectEmit(address(stXZK));
    emit StXZKMinted(address(account), uint256(0));
    stXZK.mint(address(account), 0);
    assertEq(stXZK.balanceOf(address(account)), 0);

    vm.prank(actor);
    vm.expectEmit(address(stXZK));
    emit StXZKMinted(address(account), uint256(100));
    stXZK.mint(address(account), 100);
    assertEq(stXZK.balanceOf(address(account)), 100);
    assertEq(stXZK.totalSupply(), 100);

    vm.prank(actor);
    stXZK.mint(address(account), 100);
    assertEq(stXZK.balanceOf(address(account)), 200);
    assertEq(stXZK.totalSupply(), 200);
  }
}
