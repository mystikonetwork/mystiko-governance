// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {GovernanceErrors} from "../GovernanceErrors.sol";

contract MystikoGovernorRegistry {
  address public dao;
  address public operator;
  mapping(address => bool) public previousDaos;

  event MystikoDAOChanged(address indexed dao);
  event OperatorRenounced();

  constructor(address _dao) {
    dao = _dao;
    operator = msg.sender;
  }

  modifier onlyDAO() {
    if (msg.sender != dao) revert GovernanceErrors.OnlyMystikoDAO();
    _;
  }

  modifier onlyOperator() {
    if (msg.sender != operator) revert GovernanceErrors.OnlyOperator();
    _;
  }

  function setMystikoDAO(address _newMystikoDAO) public onlyDAO {
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
