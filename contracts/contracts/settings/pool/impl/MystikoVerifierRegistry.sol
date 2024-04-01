// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {MystikoDAOGoverned} from "../../../governance/MystikoDAOGoverned.sol";
import {WrappedVerifier, IMystikoVerifierRegistry} from "../interfaces/IMystikoVerifierRegistry.sol";
import {GovernanceErrors} from "../../../libs/common/GovernanceErrors.sol";

abstract contract MystikoVerifierRegistry is IMystikoVerifierRegistry, MystikoDAOGoverned {
  mapping(uint32 => mapping(uint32 => WrappedVerifier)) private transactVerifiers;
  mapping(uint32 => WrappedVerifier) private rollupVerifiers;

  event RollupVerifierEnabled(uint32 rollupSize, address verifier);
  event RollupVerifierDisabled(uint32 rollupSize);
  event TransactVerifierEnabled(uint32 inputNumber, uint32 outputNumber, address verifier);
  event TransactVerifierDisabled(uint32 inputNumber, uint32 outputNumber);

  constructor(address[5] memory _rollupVerifiers, address[6] memory _transactVerifiers) {
    rollupVerifiers[1] = WrappedVerifier(_rollupVerifiers[0], true);
    rollupVerifiers[2] = WrappedVerifier(_rollupVerifiers[1], true);
    rollupVerifiers[4] = WrappedVerifier(_rollupVerifiers[2], true);
    rollupVerifiers[8] = WrappedVerifier(_rollupVerifiers[3], true);
    rollupVerifiers[16] = WrappedVerifier(_rollupVerifiers[4], true);
    transactVerifiers[1][0] = WrappedVerifier(_transactVerifiers[0], true);
    transactVerifiers[1][1] = WrappedVerifier(_transactVerifiers[1], true);
    transactVerifiers[1][2] = WrappedVerifier(_transactVerifiers[2], true);
    transactVerifiers[2][0] = WrappedVerifier(_transactVerifiers[3], true);
    transactVerifiers[2][1] = WrappedVerifier(_transactVerifiers[4], true);
    transactVerifiers[2][2] = WrappedVerifier(_transactVerifiers[5], true);
  }

  function queryRollupVerifier(uint32 _rollupSize) external view returns (WrappedVerifier memory) {
    return rollupVerifiers[_rollupSize];
  }

  function queryTransactVerifier(
    uint32 _numInputs,
    uint32 _numOutputs
  ) external view returns (WrappedVerifier memory) {
    return transactVerifiers[_numInputs][_numOutputs];
  }

  function enableRollupVerifier(uint32 _rollupSize, address _rollupVerifier) external onlyMystikoDAO {
    if (_rollupSize == 0 || _rollupSize > 1024) revert GovernanceErrors.InvalidRollupSize();
    if (_rollupSize & (_rollupSize - 1) != 0) revert GovernanceErrors.RollupSizeNotPowerOfTwo();
    rollupVerifiers[_rollupSize] = WrappedVerifier(_rollupVerifier, true);
    emit RollupVerifierEnabled(_rollupSize, _rollupVerifier);
  }

  function disableRollupVerifier(uint32 _rollupSize) external onlyMystikoDAO {
    if (_rollupSize == 0 || _rollupSize > 1024) revert GovernanceErrors.InvalidRollupSize();
    if (_rollupSize & (_rollupSize - 1) != 0) revert GovernanceErrors.RollupSizeNotPowerOfTwo();
    rollupVerifiers[_rollupSize].enabled = false;
    emit RollupVerifierDisabled(_rollupSize);
  }

  function enableTransactVerifier(
    uint32 _numInputs,
    uint32 _numOutputs,
    address _transactVerifier
  ) external onlyMystikoDAO {
    if (_numInputs == 0) revert GovernanceErrors.NumInputsGreaterThanZero();
    transactVerifiers[_numInputs][_numOutputs] = WrappedVerifier(_transactVerifier, true);
    emit TransactVerifierEnabled(_numInputs, _numOutputs, _transactVerifier);
  }

  function disableTransactVerifier(uint32 _numInputs, uint32 _numOutputs) external onlyMystikoDAO {
    if (_numInputs == 0) revert GovernanceErrors.NumInputsGreaterThanZero();
    transactVerifiers[_numInputs][_numOutputs].enabled = false;
    emit TransactVerifierDisabled(_numInputs, _numOutputs);
  }
}
