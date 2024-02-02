// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {Test} from "forge-std/Test.sol";

import "../../../contracts/staking/impl/StakingToken.sol";
import "../../../contracts/staking/libs/common/CustomErrors.sol";
import "../../../contracts/token/MstkoToken.sol";

contract StakingTokenOwnerTest is Test {
  MstkoToken public mstko;
  StMstkoToken public stMstko;

  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
  event MinterChanged(address indexed minter);

  function setUp() public {
    mstko = new MstkoToken();
    stMstko = new StMstkoToken(address(mstko));
  }

  function test_change_owner() public {
    vm.expectRevert("Ownable: new owner is the zero address");
    stMstko.transferOwnership(address(0));

    vm.prank(address(0));
    vm.expectRevert("Ownable: caller is not the owner");
    stMstko.transferOwnership(address(this));

    vm.expectEmit(address(stMstko));
    emit OwnershipTransferred(address(this), address(0xf));
    stMstko.transferOwnership(address(0xf));
  }

  function test_change_minter() public {
    vm.prank(address(0));
    vm.expectRevert("Ownable: caller is not the owner");
    stMstko.changeMinter(address(this));

    vm.expectRevert(CustomErrors.NotChanged.selector);
    stMstko.changeMinter(address(0));

    stMstko.changeMinter(address(this));
    vm.expectRevert(CustomErrors.NotChanged.selector);
    stMstko.changeMinter(address(this));

    vm.expectEmit(address(stMstko));
    emit MinterChanged(address(0x0));
    stMstko.changeMinter(address(0x0));
  }
}
