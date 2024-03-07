// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IMystikoRollerRegistry, CanDoRollupParams} from "../interfaces/IMystikoRollerRegistry.sol";
import {MystikoDAOGoverned} from "../../../governance/MystikoDAOGoverned.sol";
import {CustomErrors} from "../../../libs/common/CustomErrors.sol";

contract MystikoRollerRegistry is IMystikoRollerRegistry, MystikoDAOGoverned {
  mapping(address => bool) public rollers;
  uint256 public minVoteTokenAmount;
  uint256 public minRollupSize;
  address public vXZK;

  event MinVoteTokenAmountChanged(uint256 _amount);
  event MinRollupSizeChanged(uint256 _size);
  event RollerAdded(address indexed _relayer);
  event RollerRemoved(address indexed _relayer);

  constructor(address _center, address _vXZK, uint256 _minVoteTokenAmount) MystikoDAOGoverned(_center) {
    minVoteTokenAmount = _minVoteTokenAmount;
    minRollupSize = 1;
    vXZK = _vXZK;
  }

  modifier onlyRollerOrOpen(address _account) {
    if (!isRoller(address(0))) {
      if (!isRoller(_account)) revert CustomErrors.NotRoller();
    }
    _;
  }

  function canDoRollup(
    CanDoRollupParams calldata _params
  ) external view onlyRollerOrOpen(_params.roller) returns (bool) {
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

  function addRollers(address[] calldata _newRollers) external onlyMystikoDAO {
    for (uint256 i = 0; i < _newRollers.length; i++) {
      rollers[_newRollers[i]] = true;
      emit RollerAdded(_newRollers[i]);
    }
  }

  function removeRollers(address[] calldata _oldRollers) external onlyMystikoDAO {
    for (uint256 i = 0; i < _oldRollers.length; i++) {
      rollers[_oldRollers[i]] = false;
      emit RollerRemoved(_oldRollers[i]);
    }
  }

  function isRoller(address _account) public view returns (bool) {
    return rollers[_account];
  }
}
