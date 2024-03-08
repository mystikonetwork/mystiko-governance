// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {MystikoDAOGoverned} from "./MystikoDAOGoverned.sol";
import {CustomErrors} from "../libs/common/CustomErrors.sol";

abstract contract MystikoDAOAccessControl is MystikoDAOGoverned {
  mapping(address account => bool) private roles;

  event RoleGranted(address indexed account);
  event RoleRevoked(address indexed account);

  constructor(address _center) MystikoDAOGoverned(_center) {}

  modifier onlyRole(address _account) {
    if (!hasRole(_account)) revert CustomErrors.UnauthorizedRole();
    _;
  }

  modifier onlyRoleOrOpen(address _account) {
    if (!hasRole(address(0))) {
      if (!hasRole(_account)) revert CustomErrors.UnauthorizedRole();
    }
    _;
  }

  function hasRole(address _account) public view returns (bool) {
    return roles[_account];
  }

  function grantRole(address _account) public virtual onlyMystikoDAO {
    roles[_account] = true;
    emit RoleGranted(_account);
  }

  function revokeRole(address _account) public virtual onlyMystikoDAO {
    roles[_account] = false;
    emit RoleRevoked(_account);
  }

  function grantRoles(address[] calldata _accounts) public virtual onlyMystikoDAO {
    for (uint256 i = 0; i < _accounts.length; i++) {
      roles[_accounts[i]] = true;
      emit RoleGranted(_accounts[i]);
    }
  }

  function revokeRoles(address[] calldata _accounts) public virtual onlyMystikoDAO {
    for (uint256 i = 0; i < _accounts.length; i++) {
      roles[_accounts[i]] = false;
      emit RoleRevoked(_accounts[i]);
    }
  }
}
