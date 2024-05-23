// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {MystikoGovernorCenter} from "./impl/MystikoGovernorCenter.sol";
import {GovernanceErrors} from "./GovernanceErrors.sol";

abstract contract MystikoDAOGoverned {
  MystikoGovernorCenter public center;

  constructor(address _daoCenter) {
    center = MystikoGovernorCenter(_daoCenter);
  }

  modifier onlyMystikoDAO() {
    if (center.dao() != msg.sender) revert GovernanceErrors.OnlyMystikoDAO();
    _;
  }
}
