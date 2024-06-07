pragma solidity ^0.8.26;

import {GovernorVotes} from "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import {SafeCast} from "@openzeppelin/contracts/utils/math/SafeCast.sol";
import {Checkpoints} from "@openzeppelin/contracts/utils/structs/Checkpoints.sol";

abstract contract MystikoGovernorQuorum is GovernorVotes {
  using Checkpoints for Checkpoints.Trace208;

  Checkpoints.Trace208 private _quorumHistory;

  event QuorumUpdated(uint256 oldQuorum, uint256 newQuorum);

  constructor(uint256 quorumValue) {
    _updateQuorum(quorumValue);
  }

  function quorum() public view virtual returns (uint256) {
    return _quorumHistory.latest();
  }

  function quorum(uint256 timepoint) public view virtual override returns (uint256) {
    uint256 length = _quorumHistory._checkpoints.length;

    Checkpoints.Checkpoint208 storage latest = _quorumHistory._checkpoints[length - 1];
    uint48 latestKey = latest._key;
    uint208 latestValue = latest._value;
    if (latestKey <= timepoint) {
      return latestValue;
    }

    return _quorumHistory.upperLookupRecent(SafeCast.toUint48(timepoint));
  }

  function updateQuorum(uint256 newQuorum) external virtual onlyGovernance {
    _updateQuorum(newQuorum);
  }

  function _updateQuorum(uint256 newQuorum) internal virtual {
    uint256 oldQuorum = quorum();
    _quorumHistory.push(clock(), SafeCast.toUint208(newQuorum));
    emit QuorumUpdated(oldQuorum, newQuorum);
  }
}
