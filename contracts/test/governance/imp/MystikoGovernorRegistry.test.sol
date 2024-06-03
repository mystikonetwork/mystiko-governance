// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import "../../../contracts/impl/MystikoGovernorRegistry.sol";
import "../../utils/Random.sol";

contract MystikoGovernorRegistryTest is Test, Random {
  MystikoGovernorRegistry public daoRegistry;
  address public dao;

  event MystikoDAOChanged(address indexed dao);
  event OperatorRenounced();

  function setUp() public {
    dao = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    daoRegistry = new MystikoGovernorRegistry(dao);
  }

  function test_get_mystiko_dao() public {
    assertEq(daoRegistry.dao(), dao);
  }

  function test_change_mystiko_dao() public {
    address dao1 = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    vm.expectRevert(GovernanceErrors.OnlyMystikoDAO.selector);
    daoRegistry.setMystikoDAO(dao1);

    address preDao = dao;
    for (uint256 i = 0; i < 10; i++) {
      address newDao = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
      vm.expectEmit(address(daoRegistry));
      emit MystikoDAOChanged(newDao);
      vm.prank(preDao);
      daoRegistry.setMystikoDAO(newDao);
      assertEq(daoRegistry.dao(), newDao);
      assertTrue(daoRegistry.previousDaos(preDao));
      preDao = newDao;
    }
  }

  function test_roll_back_mystiko_dao() public {
    address newDao = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    address newOperator = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    vm.expectRevert(GovernanceErrors.OnlyOperator.selector);
    vm.prank(newOperator);
    daoRegistry.rollBackMystikoDAO(newDao);

    vm.expectRevert(GovernanceErrors.InvalidMystikoDAOAddress.selector);
    daoRegistry.rollBackMystikoDAO(dao);

    vm.expectRevert(GovernanceErrors.InvalidMystikoDAOAddress.selector);
    daoRegistry.rollBackMystikoDAO(newDao);

    vm.prank(dao);
    daoRegistry.setMystikoDAO(newDao);
    assertEq(daoRegistry.dao(), newDao);

    vm.expectEmit(address(daoRegistry));
    emit MystikoDAOChanged(dao);
    daoRegistry.rollBackMystikoDAO(dao);
  }

  function test_renounce_operator() public {
    vm.expectRevert(GovernanceErrors.OnlyOperator.selector);
    vm.prank(address(0));
    daoRegistry.renounceOperator();

    vm.expectEmit(address(daoRegistry));
    emit OperatorRenounced();
    daoRegistry.renounceOperator();
    assertEq(daoRegistry.operator(), address(0));

    vm.expectRevert(GovernanceErrors.OnlyOperator.selector);
    daoRegistry.renounceOperator();
    assertEq(daoRegistry.operator(), address(0));
  }
}
