// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {MystikoGovernorCenter} from "../../contracts/impl/MystikoGovernorCenter.sol";
import {GovernanceErrors} from "../../contracts/GovernanceErrors.sol";
import {MystikoDAOGoverned} from "../../contracts/MystikoDAOGoverned.sol";
import {MystikoDAOAccessControl} from "../../contracts/MystikoDAOAccessControl.sol";
import "../utils/Random.sol";

contract MockAccessControlTest is MystikoDAOGoverned, MystikoDAOAccessControl {
  constructor(address _daoCenter) MystikoDAOGoverned(_daoCenter) MystikoDAOAccessControl() {}
  function runWithRole(address account) public view onlyRole(account) returns (bool) {
    return true;
  }

  function runWithRoleOrOpen(address account) public view onlyRoleOrOpen(account) returns (bool) {
    return true;
  }
}

contract MystikoDAOAccessControlTest is Test, Random {
  MystikoGovernorCenter public center;
  address public dao;
  MockAccessControlTest public mock;

  event RoleOpened();
  event RoleGranted(address indexed account);
  event RoleRevoked(address indexed account);

  function setUp() public {
    dao = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    center = new MystikoGovernorCenter(dao);
    mock = new MockAccessControlTest(address(center));
  }

  function test_only_role() public {
    address account = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    vm.expectRevert(GovernanceErrors.UnauthorizedRole.selector);
    mock.runWithRole(account);

    vm.prank(dao);
    mock.grantRole(account);
    assertTrue(mock.hasRole(account));
    bool result1 = mock.runWithRole(account);
    assertTrue(result1);

    vm.prank(dao);
    mock.revokeRole(account);
    assertFalse(mock.hasRole(account));
    vm.expectRevert(GovernanceErrors.UnauthorizedRole.selector);
    bool result2 = mock.runWithRole(account);
    assertFalse(result2);

    vm.prank(dao);
    mock.openRole();
    assertTrue(mock.hasRole(address(0)));
    vm.expectRevert(GovernanceErrors.UnauthorizedRole.selector);
    bool result3 = mock.runWithRole(account);
    assertFalse(result3);
  }

  function test_only_role_or_open() public {
    address account = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    vm.expectRevert(GovernanceErrors.UnauthorizedRole.selector);
    mock.runWithRoleOrOpen(account);

    vm.prank(dao);
    mock.grantRole(account);
    assertTrue(mock.hasRole(account));
    bool result1 = mock.runWithRoleOrOpen(account);
    assertTrue(result1);

    vm.prank(dao);
    mock.revokeRole(account);
    assertFalse(mock.hasRole(account));
    vm.expectRevert(GovernanceErrors.UnauthorizedRole.selector);
    bool result2 = mock.runWithRoleOrOpen(account);
    assertFalse(result2);

    vm.prank(dao);
    mock.openRole();
    assertTrue(mock.hasRole(address(0)));
    bool result3 = mock.runWithRoleOrOpen(account);
    assertTrue(result3);
  }

  function test_open_role() public {
    vm.expectRevert(GovernanceErrors.OnlyMystikoDAO.selector);
    mock.openRole();

    vm.expectEmit(address(mock));
    emit RoleOpened();
    vm.prank(dao);
    mock.openRole();
    assertTrue(mock.hasRole(address(0)));
  }

  function test_grant_and_revoke_role() public {
    address account = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    vm.expectRevert(GovernanceErrors.OnlyMystikoDAO.selector);
    mock.grantRole(account);

    vm.expectEmit(address(mock));
    emit RoleGranted(account);
    vm.prank(dao);
    mock.grantRole(account);
    assertTrue(mock.hasRole(account));

    vm.expectEmit(address(mock));
    emit RoleRevoked(account);
    vm.prank(dao);
    mock.revokeRole(account);
    assertFalse(mock.hasRole(account));
  }

  function test_grant_and_revoke_roles() public {
    address account1 = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    address account2 = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    address[] memory accounts = new address[](2);
    accounts[0] = account1;
    accounts[1] = account2;

    vm.expectRevert(GovernanceErrors.OnlyMystikoDAO.selector);
    mock.grantRoles(accounts);

    vm.expectEmit(address(mock));
    emit RoleGranted(account1);
    emit RoleGranted(account2);
    vm.prank(dao);
    mock.grantRoles(accounts);
    assertTrue(mock.hasRole(account1));
    assertTrue(mock.hasRole(account2));

    vm.expectEmit(address(mock));
    emit RoleRevoked(account1);
    emit RoleRevoked(account2);
    vm.prank(dao);
    mock.revokeRoles(accounts);
    assertFalse(mock.hasRole(account1));
    assertFalse(mock.hasRole(account2));
  }
}
