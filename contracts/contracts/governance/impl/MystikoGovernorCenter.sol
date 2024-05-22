// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {GovernanceErrors} from "../../libs/common/GovernanceErrors.sol";
import {IMystikoGovernorCenter} from "../interfaces/IMystikoGovernorCenter.sol";

contract MystikoGovernorCenter is IMystikoGovernorCenter {
  address public dao;
  address public operator;
  mapping(address => bool) public previousDaos;

  event MystikoDAOChanged(address indexed dao);
  event OperatorRenounced();

  constructor(address _dao) {
    dao = _dao;
    operator = msg.sender;
  }

  modifier onlyMystikoDAO() {
    if (msg.sender != dao) revert GovernanceErrors.OnlyMystikoDAO();
    _;
  }

  modifier onlyOperator() {
    if (msg.sender != operator) revert GovernanceErrors.OnlyOperator();
    _;
  }

  function getMystikoDAO() external view returns (address) {
    return dao;
  }

  function changeMystikoDAO(address _newMystikoDAO) public onlyMystikoDAO {
    previousDaos[dao] = true;
    dao = _newMystikoDAO;
    emit MystikoDAOChanged(dao);
  }

  function rollBackMystikoDAO(address _previousDao) external onlyOperator {
    if (!previousDaos[_previousDao]) revert GovernanceErrors.InvalidMystikoDAOAddress();
    dao = _previousDao;
    emit MystikoDAOChanged(dao);
  }

  function renounceOperator() external onlyOperator {
    operator = address(0);
    emit OperatorRenounced();
  }
}
