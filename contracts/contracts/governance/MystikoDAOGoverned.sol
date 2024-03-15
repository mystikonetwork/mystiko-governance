// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IMystikoGovernorCenter} from "./interfaces/IMystikoGovernorCenter.sol";
import {GovernanceErrors} from "../libs/common/GovernanceErrors.sol";

abstract contract MystikoDAOGoverned {
  IMystikoGovernorCenter public center;

  constructor(address _daoCenter) {
    center = IMystikoGovernorCenter(_daoCenter);
  }

  modifier onlyMystikoDAO() {
    if (center.getMystikoDAO() != msg.sender) revert GovernanceErrors.OnlyMystikoDAO();
    _;
  }
}
