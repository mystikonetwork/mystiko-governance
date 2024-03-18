// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import "../../../contracts/governance/impl/MystikoGovernorCenter.sol";
import "../../utils/Random.sol";

contract MystikoGovernorCenterTest is Test, Random {
  MystikoGovernorCenter public center;
  address public dao;

  function setUp() public {
    dao = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    center = new MystikoGovernorCenter(dao);
  }

  function test_get_mystiko_dao() public {
    assertEq(center.getMystikoDAO(), dao);
  }

  function test_change_mystiko_dao() public {
    address newDao = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    vm.expectRevert(GovernanceErrors.OnlyMystikoDAO.selector);
    center.changeMystikoDAO(newDao);

    vm.prank(dao);
    vm.expectRevert(GovernanceErrors.NotChanged.selector);
    center.changeMystikoDAO(dao);

    vm.prank(dao);
    center.changeMystikoDAO(newDao);
    assertEq(center.getMystikoDAO(), newDao);
  }
}
