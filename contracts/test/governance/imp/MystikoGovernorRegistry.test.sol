// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import "../../../contracts/impl/MystikoGovernorRegistry.sol";
import "../../utils/Random.sol";

contract MystikoGovernorRegistryTest is Test, Random {
  MystikoGovernorRegistry public daoRegistry;
  address public deployer;

  event MystikoDAOChanged(address indexed dao);
  event DeployerRenounced();

  function setUp() public {
    deployer = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    vm.prank(deployer);
    daoRegistry = new MystikoGovernorRegistry();
  }

  function test_get_mystiko_dao() public {
    assertEq(daoRegistry.dao(), deployer);
  }

  function test_transfer_owner_to_dao() public {
    address newDao = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    vm.expectRevert(GovernanceErrors.OnlyBeforeDaoInitialized.selector);
    daoRegistry.transferOwnerToDAO(newDao);

    vm.expectEmit(address(daoRegistry));
    emit MystikoDAOChanged(newDao);
    vm.prank(deployer);
    daoRegistry.transferOwnerToDAO(newDao);
    assertEq(daoRegistry.dao(), newDao);

    address newDao2 = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    vm.expectRevert(GovernanceErrors.OnlyBeforeDaoInitialized.selector);
    vm.prank(deployer);
    daoRegistry.transferOwnerToDAO(newDao2);
    assertEq(daoRegistry.dao(), newDao);
    assertEq(daoRegistry.deployer(), deployer);
  }

  function test_set_mystiko_dao() public {
    address dao1 = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    vm.expectRevert(GovernanceErrors.OnlyMystikoDAO.selector);
    daoRegistry.setMystikoDAO(dao1);

    vm.expectRevert(GovernanceErrors.OnlyMystikoDAO.selector);
    vm.prank(deployer);
    daoRegistry.setMystikoDAO(dao1);
    assertEq(daoRegistry.dao(), deployer);
    assertEq(daoRegistry.deployer(), deployer);

    address dao2 = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    vm.prank(deployer);
    daoRegistry.transferOwnerToDAO(dao2);

    address preDao = dao2;
    for (uint256 i = 0; i < 10; i++) {
      address newDao = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
      vm.expectEmit(address(daoRegistry));
      emit MystikoDAOChanged(newDao);
      vm.prank(preDao);
      daoRegistry.setMystikoDAO(newDao);
      assertEq(daoRegistry.dao(), newDao);
      assertTrue(daoRegistry.daoMap(preDao));
      preDao = newDao;
    }
  }

  function test_roll_back_mystiko_dao() public {
    address newDao = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    vm.expectRevert(GovernanceErrors.OnlyDeployer.selector);
    daoRegistry.rollBackMystikoDAO(newDao);

    vm.expectRevert(GovernanceErrors.NotChanged.selector);
    vm.prank(deployer);
    daoRegistry.rollBackMystikoDAO(deployer);

    vm.expectRevert(GovernanceErrors.InvalidMystikoDAOAddress.selector);
    vm.prank(deployer);
    daoRegistry.rollBackMystikoDAO(newDao);

    vm.prank(deployer);
    daoRegistry.transferOwnerToDAO(newDao);
    assertEq(daoRegistry.dao(), newDao);

    vm.expectRevert(GovernanceErrors.InvalidMystikoDAOAddress.selector);
    vm.prank(deployer);
    daoRegistry.rollBackMystikoDAO(deployer);

    address newDao2 = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    vm.prank(newDao);
    daoRegistry.setMystikoDAO(newDao2);
    assertEq(daoRegistry.dao(), newDao2);

    vm.expectEmit(address(daoRegistry));
    emit MystikoDAOChanged(newDao);
    vm.prank(deployer);
    daoRegistry.rollBackMystikoDAO(newDao);
    assertEq(daoRegistry.dao(), newDao);

    vm.expectEmit(address(daoRegistry));
    emit MystikoDAOChanged(newDao2);
    vm.prank(deployer);
    daoRegistry.rollBackMystikoDAO(newDao2);
    assertEq(daoRegistry.dao(), newDao2);

    vm.expectRevert(GovernanceErrors.NotChanged.selector);
    vm.prank(deployer);
    daoRegistry.rollBackMystikoDAO(newDao2);
    assertEq(daoRegistry.dao(), newDao2);
  }

  function test_renounce_operator() public {
    vm.expectRevert(GovernanceErrors.OnlyDeployer.selector);
    vm.prank(address(0));
    daoRegistry.renounceDeployer();

    vm.expectEmit(address(daoRegistry));
    emit DeployerRenounced();
    vm.prank(deployer);
    daoRegistry.renounceDeployer();
    assertEq(daoRegistry.deployer(), address(0));

    vm.expectRevert(GovernanceErrors.OnlyDeployer.selector);
    daoRegistry.renounceDeployer();
    assertEq(daoRegistry.deployer(), address(0));
  }
}
