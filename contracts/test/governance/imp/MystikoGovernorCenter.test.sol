// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import "../../../contracts/governance/impl/MystikoGovernorCenter.sol";
import "../../utils/Random.sol";

contract MystikoGovernorCenterTest is Test, Random {
  MystikoGovernorCenter public center;
  address public dao;

  event MystikoDAOChanged(address indexed dao);
  event OperatorRenounced();

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

    address preDao = dao;
    for (uint256 i = 0; i < 10; i++) {
      address newDao = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
      vm.expectEmit(address(center));
      emit MystikoDAOChanged(newDao);
      vm.prank(preDao);
      center.changeMystikoDAO(newDao);
      assertEq(center.getMystikoDAO(), newDao);
      assertTrue(center.previousDaos(preDao));
      preDao = newDao;
    }
  }

  function test_roll_back_mystiko_dao() public {
    address newDao = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    address newOperator = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    vm.expectRevert(GovernanceErrors.OnlyOperator.selector);
    vm.prank(newOperator);
    center.rollBackMystikoDAO(newDao);

    vm.expectRevert(GovernanceErrors.InvalidMystikoDAOAddress.selector);
    center.rollBackMystikoDAO(dao);

    vm.expectRevert(GovernanceErrors.InvalidMystikoDAOAddress.selector);
    center.rollBackMystikoDAO(newDao);

    vm.prank(dao);
    center.changeMystikoDAO(newDao);
    assertEq(center.getMystikoDAO(), newDao);

    vm.expectEmit(address(center));
    emit MystikoDAOChanged(dao);
    center.rollBackMystikoDAO(dao);
  }

  function test_renounce_operator() public {
    vm.expectRevert(GovernanceErrors.OnlyOperator.selector);
    vm.prank(address(0));
    center.renounceOperator();

    vm.expectEmit(address(center));
    emit OperatorRenounced();
    center.renounceOperator();
    assertEq(center.operator(), address(0));

    vm.expectRevert(GovernanceErrors.OnlyOperator.selector);
    center.renounceOperator();
    assertEq(center.operator(), address(0));
  }
}
