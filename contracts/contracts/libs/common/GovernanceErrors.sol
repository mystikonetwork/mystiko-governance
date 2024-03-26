// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library GovernanceErrors {
  error NotChanged();
  error OnlyMystikoDAO();
  error UnauthorizedRole();
  error InsufficientBalanceForAction();
  error RollupSizeTooSmall();
  error AuditorIndexError();
  error NumInputsGreaterThanZero();
  error InvalidRollupSize();
  error RollupSizeNotPowerOfTwo();
}
