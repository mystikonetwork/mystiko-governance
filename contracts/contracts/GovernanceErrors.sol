// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library GovernanceErrors {
  error NotChanged();
  error OnlyMystikoDAO();
  error InvalidMystikoDAOAddress();
  error OnlyOperator();
  error UnauthorizedRole();
}
