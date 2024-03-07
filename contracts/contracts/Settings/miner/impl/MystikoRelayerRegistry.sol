// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IMystikoRelayerRegistry, CanDoRelayParams} from "../interfaces/IMystikoRelayerRegistry.sol";
import {MystikoDAOGoverned} from "../../../governance/MystikoDAOGoverned.sol";
import {CustomErrors} from "../../../libs/common/CustomErrors.sol";

contract MystikoRelayerRegistry is IMystikoRelayerRegistry, MystikoDAOGoverned {
  mapping(address => bool) public relayers;
  uint256 public minVoteTokenAmount;
  address public vXZK;

  event MinVoteTokenAmountChanged(uint256 _amount);
  event RelayerAdded(address indexed _relayer);
  event RelayerRemoved(address indexed _relayer);

  constructor(address _center, address _vXZK) MystikoDAOGoverned(_center) {
    minVoteTokenAmount = 100_000e18;
    vXZK = _vXZK;
  }

  modifier onlyRelayerOrOpen(address _account) {
    if (!isRelayer(address(0))) {
      if (!isRelayer(_account)) revert CustomErrors.NotRelayer();
    }
    _;
  }

  function canDoRelay(
    CanDoRelayParams calldata _params
  ) external view onlyRelayerOrOpen(_params.relayer) returns (bool) {
    if (IERC20(vXZK).balanceOf(_params.relayer) < minVoteTokenAmount)
      revert CustomErrors.InsufficientBalanceForAction();

    return true;
  }

  function changeMinVoteTokenAmount(uint256 _newMinVoteTokenAmount) external onlyMystikoDAO {
    if (minVoteTokenAmount == _newMinVoteTokenAmount) revert CustomErrors.NotChanged();
    minVoteTokenAmount = _newMinVoteTokenAmount;
    emit MinVoteTokenAmountChanged(minVoteTokenAmount);
  }

  function addRelayers(address[] calldata _newRelayers) external onlyMystikoDAO {
    for (uint256 i = 0; i < _newRelayers.length; i++) {
      relayers[_newRelayers[i]] = true;
      emit RelayerAdded(_newRelayers[i]);
    }
  }

  function removeRelayers(address[] calldata _oldRelayers) external onlyMystikoDAO {
    for (uint256 i = 0; i < _oldRelayers.length; i++) {
      relayers[_oldRelayers[i]] = false;
      emit RelayerRemoved(_oldRelayers[i]);
    }
  }

  function isRelayer(address _account) public view returns (bool) {
    return relayers[_account];
  }
}
