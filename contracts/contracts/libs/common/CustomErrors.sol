// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library CustomErrors {
  error NotChanged();
  error OnlyMystikoDAO();
  error UnauthorizedRole();
  error InsufficientBalanceForAction();
  error RollupSizeTooSmall();
}
