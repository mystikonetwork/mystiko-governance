// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IMystikoRelayerRegistry, CanDoRelayParams} from "../interfaces/IMystikoRelayerRegistry.sol";
import {MystikoDAOAccessControl} from "../../../governance/MystikoDAOAccessControl.sol";
import {CustomErrors} from "../../../libs/common/CustomErrors.sol";

contract MystikoRelayerRegistry is IMystikoRelayerRegistry, MystikoDAOAccessControl {
  uint256 public minVoteTokenAmount;
  address public vXZK;

  event MinVoteTokenAmountChanged(uint256 _amount);

  constructor(
    address _daoCenter,
    address _vXZK,
    uint256 _minVoteTokenAmount
  ) MystikoDAOAccessControl(_daoCenter) {
    minVoteTokenAmount = _minVoteTokenAmount;
    vXZK = _vXZK;
  }

  function canDoRelay(
    CanDoRelayParams calldata _params
  ) external view onlyRoleOrOpen(_params.relayer) returns (bool) {
    if (IERC20(vXZK).balanceOf(_params.relayer) < minVoteTokenAmount)
      revert CustomErrors.InsufficientBalanceForAction();

    return true;
  }

  function changeMinVoteTokenAmount(uint256 _newMinVoteTokenAmount) external onlyMystikoDAO {
    if (minVoteTokenAmount == _newMinVoteTokenAmount) revert CustomErrors.NotChanged();
    minVoteTokenAmount = _newMinVoteTokenAmount;
    emit MinVoteTokenAmountChanged(minVoteTokenAmount);
  }
}
