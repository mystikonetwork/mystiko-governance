// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IMystikoRollerRegistry, CanDoRollupParams} from "../interfaces/IMystikoRollerRegistry.sol";
import {MystikoDAOAccessControl} from "../../../governance/MystikoDAOAccessControl.sol";
import {CustomErrors} from "../../../libs/common/CustomErrors.sol";

contract MystikoRollerRegistry is IMystikoRollerRegistry, MystikoDAOAccessControl {
  uint256 public minVoteTokenAmount;
  uint256 public minRollupSize;
  address public vXZK;

  event MinVoteTokenAmountChanged(uint256 _amount);
  event MinRollupSizeChanged(uint256 _size);

  constructor(
    address _daoCenter,
    address _vXZK,
    uint256 _minVoteTokenAmount
  ) MystikoDAOAccessControl(_daoCenter) {
    minVoteTokenAmount = _minVoteTokenAmount;
    minRollupSize = 1;
    vXZK = _vXZK;
  }

  function canDoRollup(
    CanDoRollupParams calldata _params
  ) external view onlyRoleOrOpen(_params.roller) returns (bool) {
    if (_params.rollupSize < minRollupSize) revert CustomErrors.RollupSizeTooSmall();
    if (IERC20(vXZK).balanceOf(_params.roller) < minVoteTokenAmount)
      revert CustomErrors.InsufficientBalanceForAction();

    return true;
  }

  function changeMinVoteTokenAmount(uint256 _newMinVoteTokenAmount) external onlyMystikoDAO {
    if (minVoteTokenAmount == _newMinVoteTokenAmount) revert CustomErrors.NotChanged();
    minVoteTokenAmount = _newMinVoteTokenAmount;
    emit MinVoteTokenAmountChanged(minVoteTokenAmount);
  }

  function changeMinRollupSize(uint256 _newMinRollupSize) external onlyMystikoDAO {
    if (minRollupSize == _newMinRollupSize) revert CustomErrors.NotChanged();
    minRollupSize = _newMinRollupSize;
    emit MinRollupSizeChanged(minRollupSize);
  }
}
