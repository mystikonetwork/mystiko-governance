// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library CustomErrors {
  error NotChanged();
  error OnlyMystikoDAO();
  error InsufficientBalanceForAction();
  error NotRelayer();
  error NotRoller();
  error RollupSizeTooSmall();
}
