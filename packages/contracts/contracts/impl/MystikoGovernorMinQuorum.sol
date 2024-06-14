pragma solidity ^0.8.26;

import {GovernorVotes} from "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import {SafeCast} from "@openzeppelin/contracts/utils/math/SafeCast.sol";
import {Checkpoints} from "@openzeppelin/contracts/utils/structs/Checkpoints.sol";

abstract contract MystikoGovernorMinQuorum is GovernorVotes {
  using Checkpoints for Checkpoints.Trace208;

  Checkpoints.Trace208 private _minQuorumHistory;

  event MinQuorumUpdated(uint256 oldMinQuorum, uint256 newMinQuorum);

  constructor(uint256 minQuorumValue) {
    _updateMinQuorum(minQuorumValue);
  }

  function minQuorum() public view virtual returns (uint256) {
    return _minQuorumHistory.latest();
  }

  function minQuorum(uint256 timepoint) public view virtual returns (uint256) {
    uint256 length = _minQuorumHistory._checkpoints.length;

    Checkpoints.Checkpoint208 storage latest = _minQuorumHistory._checkpoints[length - 1];
    uint48 latestKey = latest._key;
    uint208 latestValue = latest._value;
    if (latestKey <= timepoint) {
      return latestValue;
    }

    return _minQuorumHistory.upperLookupRecent(SafeCast.toUint48(timepoint));
  }

  function updateMinQuorum(uint256 newMinQuorum) external virtual onlyGovernance {
    _updateMinQuorum(newMinQuorum);
  }

  function _updateMinQuorum(uint256 newMinQuorum) internal virtual {
    uint256 oldMinQuorum = minQuorum();
    _minQuorumHistory.push(clock(), SafeCast.toUint208(newMinQuorum));
    emit MinQuorumUpdated(oldMinQuorum, newMinQuorum);
  }
}
