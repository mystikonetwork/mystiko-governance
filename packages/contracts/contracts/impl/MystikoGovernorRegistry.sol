// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {GovernanceErrors} from "../GovernanceErrors.sol";

contract MystikoGovernorRegistry {
    address public dao;
    address public deployer;
    mapping(address => bool) public daoMap;

    event MystikoDAOChanged(address indexed newDao);
    event DeployerRenounced();

    modifier onlyDAO() {
        if (msg.sender != dao || msg.sender == deployer) revert GovernanceErrors.OnlyMystikoDAO();
        _;
    }

    modifier onlyDeployer() {
        if (msg.sender != deployer) revert GovernanceErrors.OnlyDeployer();
        _;
    }

    modifier onlyBeforeDaoInitialized() {
        if (msg.sender != deployer || dao != deployer) revert GovernanceErrors.OnlyBeforeDaoInitialized();
        _;
    }

    constructor() {
        dao = msg.sender;
        deployer = msg.sender;
    }

    function transferOwnerToDAO(address _newDao) external onlyBeforeDaoInitialized {
        dao = _newDao;
        daoMap[_newDao] = true;
        emit MystikoDAOChanged(_newDao);
    }

    function setMystikoDAO(address _newDao) external onlyDAO {
        if (dao == _newDao) revert GovernanceErrors.NotChanged();
        dao = _newDao;
        daoMap[_newDao] = true;
        emit MystikoDAOChanged(_newDao);
    }

    function rollBackMystikoDAO(address _previousDao) external onlyDeployer {
        if (_previousDao == dao) revert GovernanceErrors.NotChanged();
        if (!daoMap[_previousDao]) revert GovernanceErrors.InvalidMystikoDAOAddress();
        dao = _previousDao;
        emit MystikoDAOChanged(_previousDao);
    }

    function renounceDeployer() external onlyDeployer {
        deployer = address(0);
        emit DeployerRenounced();
    }
}
