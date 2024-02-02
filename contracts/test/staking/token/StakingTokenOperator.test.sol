// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {Test} from "forge-std/Test.sol";

import "../../../contracts/staking/impl/StakingToken.sol";
import "../../../contracts/staking/libs/common/CustomErrors.sol";
import "../../../contracts/token/MstkoToken.sol";

contract StakingTokenTest is Test {
  MstkoToken public mstko;
  StMstkoToken public stMstko;

  event OperatorChanged(address indexed operator);
  event MinterChanged(address indexed minter);

  function setUp() public {
    mstko = new MstkoToken();
    stMstko = new StMstkoToken(address(mstko));
  }

  function test_change_operator() public {
    vm.expectRevert(CustomErrors.NotChanged.selector);
    stMstko.changeOperator(address(this));

    vm.prank(address(0));
    vm.expectRevert(CustomErrors.OnlyOperator.selector);
    stMstko.changeOperator(address(this));

    stMstko.changeOperator(address(0));
    vm.expectRevert(CustomErrors.OnlyOperator.selector);
    stMstko.changeOperator(address(this));

    vm.prank(address(0));
    stMstko.changeOperator(address(this));
    vm.expectRevert(CustomErrors.NotChanged.selector);
    stMstko.changeOperator(address(this));

    vm.expectEmit(address(stMstko));
    emit OperatorChanged(address(0x0));
    stMstko.changeOperator(address(0x0));
  }

  function test_change_minter() public {
    vm.prank(address(0));
    vm.expectRevert(CustomErrors.OnlyOperator.selector);
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
