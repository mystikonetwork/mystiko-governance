// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {TimelockController} from "@openzeppelin/contracts/governance/TimelockController.sol";

contract MystikoTimelockController is TimelockController {
  constructor(
    uint256 _minDelay
  ) TimelockController(_minDelay, new address[](0), new address[](0), msg.sender) {}

  function grantGovernorRole(address _governor) external onlyRole(DEFAULT_ADMIN_ROLE) {
    super.grantRole(PROPOSER_ROLE, _governor);
    super.grantRole(EXECUTOR_ROLE, _governor);
    super.grantRole(CANCELLER_ROLE, _governor);
    super.revokeRole(DEFAULT_ADMIN_ROLE, msg.sender);
  }
}
