// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {MystikoGovernorMinQuorum} from "./MystikoGovernorMinQuorum.sol";
import {Governor} from "@openzeppelin/contracts/governance/Governor.sol";
import {GovernorSettings} from "@openzeppelin/contracts/governance/extensions/GovernorSettings.sol";
import {GovernorPreventLateQuorum} from "@openzeppelin/contracts/governance/extensions/GovernorPreventLateQuorum.sol";
import {GovernorCountingSimple} from "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import {GovernorVotes} from "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import {GovernorVotesQuorumFraction} from "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import {GovernorTimelockControl} from "@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol";
import {TimelockController} from "@openzeppelin/contracts/governance/TimelockController.sol";
import {IVotes} from "@openzeppelin/contracts/governance/utils/IVotes.sol";
import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";

contract MystikoGovernor is
  Governor,
  GovernorSettings,
  GovernorPreventLateQuorum,
  GovernorCountingSimple,
  GovernorVotes,
  MystikoGovernorMinQuorum,
  GovernorVotesQuorumFraction,
  GovernorTimelockControl
{
  constructor(
    IVotes _voteToken,
    TimelockController _timelock,
    uint48 _votingDelay,
    uint32 _votingPeriod,
    uint48 _voteExtension
  )
    Governor("MystikoGovernor")
    GovernorSettings(_votingDelay, _votingPeriod, 5_000_000e18)
    GovernorPreventLateQuorum(_voteExtension)
    GovernorVotes(_voteToken)
    MystikoGovernorMinQuorum(10_000_000e18)
    GovernorVotesQuorumFraction(15)
    GovernorTimelockControl(_timelock)
  {}

  function votingDelay() public view virtual override(Governor, GovernorSettings) returns (uint256) {
    return super.votingDelay();
  }

  function votingPeriod() public view virtual override(Governor, GovernorSettings) returns (uint256) {
    return super.votingPeriod();
  }

  function proposalThreshold() public view virtual override(Governor, GovernorSettings) returns (uint256) {
    return super.proposalThreshold();
  }

  function _castVote(
    uint256 _proposalId,
    address _account,
    uint8 _support,
    string memory _reason,
    bytes memory _params
  ) internal virtual override(Governor, GovernorPreventLateQuorum) returns (uint256) {
    return super._castVote(_proposalId, _account, _support, _reason, _params);
  }

  function proposalDeadline(
    uint256 _proposalId
  ) public view virtual override(Governor, GovernorPreventLateQuorum) returns (uint256) {
    return super.proposalDeadline(_proposalId);
  }

  function quorum(
    uint256 _timepoint
  ) public view virtual override(Governor, GovernorVotesQuorumFraction) returns (uint256) {
    uint256 superQuorum = super.quorum(_timepoint);
    uint256 minimumQuorum = minQuorum(_timepoint);
    return Math.max(superQuorum, minimumQuorum);
  }

  function state(
    uint256 _proposalId
  ) public view override(Governor, GovernorTimelockControl) returns (ProposalState) {
    return super.state(_proposalId);
  }

  function proposalNeedsQueuing(
    uint256 _proposalId
  ) public view virtual override(Governor, GovernorTimelockControl) returns (bool) {
    return super.proposalNeedsQueuing(_proposalId);
  }

  function _queueOperations(
    uint256 _proposalId,
    address[] memory _targets,
    uint256[] memory _values,
    bytes[] memory _calldatas,
    bytes32 _descriptionHash
  ) internal override(Governor, GovernorTimelockControl) returns (uint48) {
    return super._queueOperations(_proposalId, _targets, _values, _calldatas, _descriptionHash);
  }

  function _executeOperations(
    uint256 _proposalId,
    address[] memory _targets,
    uint256[] memory _values,
    bytes[] memory _calldatas,
    bytes32 _descriptionHash
  ) internal override(Governor, GovernorTimelockControl) {
    super._executeOperations(_proposalId, _targets, _values, _calldatas, _descriptionHash);
  }

  function _cancel(
    address[] memory _targets,
    uint256[] memory _values,
    bytes[] memory _calldatas,
    bytes32 _descriptionHash
  ) internal override(Governor, GovernorTimelockControl) returns (uint256) {
    return super._cancel(_targets, _values, _calldatas, _descriptionHash);
  }

  function _executor() internal view override(Governor, GovernorTimelockControl) returns (address) {
    return super._executor();
  }
}
