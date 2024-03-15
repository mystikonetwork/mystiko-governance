// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {GovernanceErrors} from "../../libs/common/GovernanceErrors.sol";
import {IMystikoGovernorCenter} from "../interfaces/IMystikoGovernorCenter.sol";

contract MystikoGovernorCenter is IMystikoGovernorCenter {
  address public dao;

  event MystikoDAOChanged(address indexed dao);

  constructor(address _dao) {
    dao = _dao;
  }

  modifier onlyMystikoDAO() {
    if (msg.sender != dao) revert GovernanceErrors.OnlyMystikoDAO();
    _;
  }

  function getMystikoDAO() external view returns (address) {
    return dao;
  }

  function changeMystikoDAO(address _newMystikoDAO) public onlyMystikoDAO {
    if (dao == _newMystikoDAO) revert GovernanceErrors.NotChanged();
    dao = _newMystikoDAO;
    emit MystikoDAOChanged(dao);
  }
}
