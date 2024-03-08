// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IMystikoGovernorCenter} from "./interfaces/IMystikoGovernorCenter.sol";
import {CustomErrors} from "../libs/common/CustomErrors.sol";

abstract contract MystikoDAOGoverned {
  IMystikoGovernorCenter public center;

  constructor(address _governorCenter) {
    center = IMystikoGovernorCenter(_governorCenter);
  }

  modifier onlyMystikoDAO() {
    if (center.getMystikoDAO() != msg.sender) revert CustomErrors.OnlyMystikoDAO();
    _;
  }
}
