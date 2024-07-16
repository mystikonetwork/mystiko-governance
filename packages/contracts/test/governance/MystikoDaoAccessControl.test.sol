// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Test} from "forge-std/Test.sol";
import {MystikoGovernorRegistry} from "../../contracts/impl/MystikoGovernorRegistry.sol";
import {GovernanceErrors} from "../../contracts/GovernanceErrors.sol";
import {MystikoDAOAccessControl} from "../../contracts/MystikoDAOAccessControl.sol";
import "../utils/Random.sol";
import "forge-std/console.sol";

contract MockMystikoContract is MystikoDAOAccessControl, Random {
  bytes32 public constant TEST_ROLE = keccak256("TEST_ROLE");

  constructor(address _daoCenter) MystikoDAOAccessControl(_daoCenter) {}

  function runOnlyDao() public view onlyMystikoDAO returns (bool) {
    return true;
  }

  function runWithRole(address _account) public view onlyHasRole(TEST_ROLE, _account) returns (bool) {
    return true;
  }

  function runWithRoleOrOpen(
    address _account
  ) public view onlyHasRoleOrOpen(TEST_ROLE, _account) returns (bool) {
    return true;
  }
}

contract MystikoDaoAccessControlTest is Test, Random {
  bytes32 public constant TEST_ROLE = keccak256("TEST_ROLE");

  MystikoGovernorRegistry public daoRegistry;
  address public deployer;
  MockMystikoContract public mock;

  function setUp() public {
    deployer = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    vm.prank(deployer);
    daoRegistry = new MystikoGovernorRegistry();
    mock = new MockMystikoContract(address(daoRegistry));
    vm.prank(deployer);
    mock.setAdminRole();
  }

  function test_only_dao() public {
    vm.expectRevert(GovernanceErrors.OnlyMystikoDAO.selector);
    mock.runOnlyDao();

    vm.prank(deployer);
    bool result = mock.runOnlyDao();
    assertTrue(result);
  }

  function test_only_role() public {
    address account = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    assertFalse(mock.hasRole(TEST_ROLE, account));

    vm.expectRevert(GovernanceErrors.UnauthorizedRole.selector);
    mock.runWithRole(account);

    vm.prank(deployer);
    mock.grantRole(TEST_ROLE, account);
    assertTrue(mock.hasRole(TEST_ROLE, account));

    bool result1 = mock.runWithRole(account);
    assertTrue(result1);

    vm.prank(deployer);
    mock.revokeRole(TEST_ROLE, account);
    assertFalse(mock.hasRole(TEST_ROLE, account));
    vm.expectRevert(GovernanceErrors.UnauthorizedRole.selector);
    bool result2 = mock.runWithRole(account);
    assertFalse(result2);

    vm.prank(deployer);
    mock.grantRole(TEST_ROLE, address(0));
    assertTrue(mock.hasRole(TEST_ROLE, address(0)));
    vm.expectRevert(GovernanceErrors.UnauthorizedRole.selector);
    bool result3 = mock.runWithRole(account);
    assertFalse(result3);
  }

  function test_only_role_or_open() public {
    address account = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    assertFalse(mock.hasRole(TEST_ROLE, account));

    vm.expectRevert(GovernanceErrors.UnauthorizedRole.selector);
    mock.runWithRole(account);

    vm.prank(deployer);
    mock.grantRole(TEST_ROLE, account);
    assertTrue(mock.hasRole(TEST_ROLE, account));

    bool result1 = mock.runWithRole(account);
    assertTrue(result1);

    vm.prank(deployer);
    mock.revokeRole(TEST_ROLE, account);
    assertFalse(mock.hasRole(TEST_ROLE, account));
    vm.expectRevert(GovernanceErrors.UnauthorizedRole.selector);
    bool result2 = mock.runWithRole(account);
    assertFalse(result2);

    vm.prank(deployer);
    mock.grantRole(TEST_ROLE, address(0));
    assertTrue(mock.hasRole(TEST_ROLE, address(0)));
    bool result3 = mock.runWithRoleOrOpen(account);
    assertTrue(result3);
  }

  function test_set_admin_role() public {
    bool result = mock.hasRole(mock.DEFAULT_ADMIN_ROLE(), deployer);
    assertTrue(result);

    bytes32 adminRole = mock.getRoleAdmin(TEST_ROLE);
    assertEq(adminRole, mock.DEFAULT_ADMIN_ROLE());

    address newDao = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    vm.expectRevert(GovernanceErrors.OnlyMystikoDAO.selector);
    vm.prank(newDao);
    mock.setAdminRole();

    vm.prank(deployer);
    daoRegistry.transferOwnerToDAO(newDao);
    bool result2 = mock.hasRole(mock.DEFAULT_ADMIN_ROLE(), newDao);
    assertFalse(result2);

    vm.prank(newDao);
    mock.setAdminRole();
    bool result3 = mock.hasRole(mock.DEFAULT_ADMIN_ROLE(), newDao);
    assertTrue(result3);
    bool result4 = mock.hasRole(mock.DEFAULT_ADMIN_ROLE(), deployer);
    assertTrue(result4);

    vm.prank(newDao);
    mock.grantRole(TEST_ROLE, newDao);
    assertTrue(mock.hasRole(TEST_ROLE, newDao));
  }
}
