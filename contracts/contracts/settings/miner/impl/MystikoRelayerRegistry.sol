// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IMystikoRelayer, CanDoRelayParams} from "../interfaces/IMystikoRelayer.sol";
import {MystikoDAOGoverned} from "../../../governance/MystikoDAOGoverned.sol";
import {MystikoDAOAccessControl} from "../../../governance/MystikoDAOAccessControl.sol";
import {GovernanceErrors} from "../../../libs/common/GovernanceErrors.sol";

contract MystikoRelayerRegistry is IMystikoRelayer, MystikoDAOGoverned, MystikoDAOAccessControl {
  uint256 public minVoteTokenAmount;
  address public vXZK;

  event RelayerMinVoteTokenAmountChanged(uint256 _amount);

  constructor(
    address _daoCenter,
    address _vXZK,
    uint256 _minVoteTokenAmount
  ) MystikoDAOGoverned(_daoCenter) MystikoDAOAccessControl() {
    minVoteTokenAmount = _minVoteTokenAmount;
    vXZK = _vXZK;
  }

  function canDoRelay(
    CanDoRelayParams calldata _params
  ) external view onlyRoleOrOpen(_params.relayer) returns (bool) {
    if (IERC20(vXZK).balanceOf(_params.relayer) < minVoteTokenAmount)
      revert GovernanceErrors.InsufficientBalanceForAction();

    return true;
  }

  function changeRelayerMinVoteTokenAmount(uint256 _newMinVoteTokenAmount) external onlyMystikoDAO {
    if (minVoteTokenAmount == _newMinVoteTokenAmount) revert GovernanceErrors.NotChanged();
    minVoteTokenAmount = _newMinVoteTokenAmount;
    emit RelayerMinVoteTokenAmountChanged(minVoteTokenAmount);
  }
}
