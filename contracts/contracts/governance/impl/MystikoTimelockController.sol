// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {TimelockController} from "../libs/external/TimelockController.sol";

contract MystikoTimelockController is TimelockController {
  constructor(
    uint256 _minDelay,
    address[] memory _proposers,
    address[] memory _executors,
    address _admin
  ) TimelockController(_minDelay, _proposers, _executors, _admin) {}

  function schedule(
    address _target,
    uint256 _value,
    bytes calldata _data,
    bytes32 _predecessor,
    bytes32 _salt,
    uint256 _delay
  ) public override onlyRoleOrOpenRole(PROPOSER_ROLE) {
    bytes32 id = hashOperation(_target, _value, _data, _predecessor, _salt);
    _schedule(id, _delay);
    emit CallScheduled(id, 0, _target, _value, _data, _predecessor, _delay);
    if (_salt != bytes32(0)) {
      emit CallSalt(id, _salt);
    }
  }

  function scheduleBatch(
    address[] calldata _targets,
    uint256[] calldata _values,
    bytes[] calldata _payloads,
    bytes32 _predecessor,
    bytes32 _salt,
    uint256 _delay
  ) public override onlyRoleOrOpenRole(PROPOSER_ROLE) {
    if (_targets.length != _values.length || _targets.length != _payloads.length) {
      revert TimelockInvalidOperationLength(_targets.length, _payloads.length, _values.length);
    }

    bytes32 id = hashOperationBatch(_targets, _values, _payloads, _predecessor, _salt);
    _schedule(id, _delay);
    for (uint256 i = 0; i < _targets.length; ++i) {
      emit CallScheduled(id, i, _targets[i], _values[i], _payloads[i], _predecessor, _delay);
    }
    if (_salt != bytes32(0)) {
      emit CallSalt(id, _salt);
    }
  }

  function cancel(bytes32 _id) public override onlyRoleOrOpenRole(CANCELLER_ROLE) {
    if (!isOperationPending(_id)) {
      revert TimelockUnexpectedOperationState(
        _id,
        _encodeStateBitmap(OperationState.Waiting) | _encodeStateBitmap(OperationState.Ready)
      );
    }
    delete _timestamps[_id];
    emit Cancelled(_id);
  }
}
