// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

library GovernanceErrors {
    error NotChanged();
    error OnlyMystikoDAO();
    error InvalidMystikoRegistryAddress();
    error InvalidMystikoDAOAddress();
    error OnlyDeployer();
    error OnlyBeforeDaoInitialized();
    error UnauthorizedRole();
}
