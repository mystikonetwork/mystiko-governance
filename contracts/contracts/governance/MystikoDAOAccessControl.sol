// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {MystikoDAOGoverned} from "./MystikoDAOGoverned.sol";
import {GovernanceErrors} from "../libs/common/GovernanceErrors.sol";

abstract contract MystikoDAOAccessControl is MystikoDAOGoverned {
  mapping(address => bool) private roles;

  event RoleGranted(address indexed account);
  event RoleRevoked(address indexed account);

  modifier onlyRole(address _account) {
    if (!hasRole(_account)) revert GovernanceErrors.UnauthorizedRole();
    _;
  }

  modifier onlyRoleOrOpen(address _account) {
    if (!hasRole(address(0))) {
      if (!hasRole(_account)) revert GovernanceErrors.UnauthorizedRole();
    }
    _;
  }

  function hasRole(address _account) public view returns (bool) {
    return roles[_account];
  }

  function grantRole(address _account) external virtual onlyMystikoDAO {
    roles[_account] = true;
    emit RoleGranted(_account);
  }

  function revokeRole(address _account) external virtual onlyMystikoDAO {
    roles[_account] = false;
    emit RoleRevoked(_account);
  }

  function grantRoles(address[] calldata _accounts) external virtual onlyMystikoDAO {
    for (uint256 i = 0; i < _accounts.length; i++) {
      roles[_accounts[i]] = true;
      emit RoleGranted(_accounts[i]);
    }
  }

  function revokeRoles(address[] calldata _accounts) external virtual onlyMystikoDAO {
    for (uint256 i = 0; i < _accounts.length; i++) {
      roles[_accounts[i]] = false;
      emit RoleRevoked(_accounts[i]);
    }
  }
}
