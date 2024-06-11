// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {GovernanceErrors} from "./GovernanceErrors.sol";
import {MystikoGovernorRegistry} from "./impl/MystikoGovernorRegistry.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

abstract contract MystikoDAOAccessControl is AccessControl {
  MystikoGovernorRegistry public daoRegistry;

  constructor(address _daoRegistry) {
    daoRegistry = MystikoGovernorRegistry(_daoRegistry);
  }

  modifier onlyMystikoDAO() {
    if (daoRegistry.dao() != msg.sender) revert GovernanceErrors.OnlyMystikoDAO();
    _;
  }

  modifier onlyHasRole(bytes32 _role, address _account) {
    if (!hasRole(_role, _account)) revert GovernanceErrors.UnauthorizedRole();
    _;
  }

  modifier onlyHasRoleOrOpen(bytes32 _role, address _account) {
    if (!hasRole(_role, address(0))) {
      if (!hasRole(_role, _account)) revert GovernanceErrors.UnauthorizedRole();
    }
    _;
  }

  function setAdminRole() public onlyMystikoDAO {
    _grantRole(DEFAULT_ADMIN_ROLE, daoRegistry.dao());
  }
}
