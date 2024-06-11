// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Test} from "forge-std/Test.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IGovernor} from "@openzeppelin/contracts/governance/IGovernor.sol";
import {DoubleEndedQueue} from "@openzeppelin/contracts/utils/structs/DoubleEndedQueue.sol";
import "../../utils/Random.sol";
import "../../../contracts/impl/MystikoGovernor.sol";
import "../../../contracts/impl/MystikoTimelockController.sol";
import "../../mock/MockMystikoToken.sol";
import "../../../contracts/token/MystikoVoteToken.sol";

contract MystikoGovernorTest is Test, Random {
  MockMystikoToken public XZK;
  MystikoVoteToken public vXZK;
  MystikoGovernor public governor;
  MystikoTimelockController public controller;

  function _delegateVote(address account, uint256 amount) private {
    uint256 balanceBefore = vXZK.balanceOf(account);

    XZK.transfer(account, amount);
    vm.prank(account);
    XZK.approve(address(vXZK), amount);
    vm.prank(account);
    vXZK.depositFor(account, amount);

    uint256 balanceAfter = vXZK.balanceOf(account);
    assertEq(balanceAfter, amount + balanceBefore);
    vm.prank(account);
    vXZK.delegate(account);
    vm.warp(block.timestamp + 1);
    vm.roll(block.number + 1);
  }

  function _castVote(address account, uint256 proposeId, GovernorCountingSimple.VoteType vote) private {
    vm.prank(account);
    governor.castVote(proposeId, uint8(vote));
  }

  function _encodeStateBitmap(IGovernor.ProposalState proposalState) internal pure returns (bytes32) {
    return bytes32(1 << uint8(proposalState));
  }

  function _encodeStateBitmap(
    TimelockController.OperationState operationState
  ) internal pure returns (bytes32) {
    return bytes32(1 << uint8(operationState));
  }

  function setUp() public {
    XZK = new MockMystikoToken();
    vXZK = new MystikoVoteToken(IERC20(XZK));
    controller = new MystikoTimelockController(4 hours);
    governor = new MystikoGovernor(vXZK, controller, 1 days, 7 days, 1 days);
    controller.grantGovernorRole(address(governor));
  }

  function test_construct_role() public {
    bool hasRole = controller.hasRole(controller.PROPOSER_ROLE(), address(governor));
    assertTrue(hasRole);
    hasRole = controller.hasRole(controller.EXECUTOR_ROLE(), address(governor));
    assertTrue(hasRole);
    hasRole = controller.hasRole(controller.CANCELLER_ROLE(), address(governor));
    assertTrue(hasRole);
    hasRole = controller.hasRole(controller.DEFAULT_ADMIN_ROLE(), address(governor));
    assertFalse(hasRole);

    hasRole = controller.hasRole(controller.PROPOSER_ROLE(), address(controller));
    assertFalse(hasRole);
    hasRole = controller.hasRole(controller.EXECUTOR_ROLE(), address(controller));
    assertFalse(hasRole);
    hasRole = controller.hasRole(controller.CANCELLER_ROLE(), address(controller));
    assertFalse(hasRole);
    hasRole = controller.hasRole(controller.DEFAULT_ADMIN_ROLE(), address(governor));
    assertFalse(hasRole);
  }

  function test_voting_delay() public {
    assertEq(governor.votingDelay(), 1 days);
  }

  function test_voting_period() public {
    assertEq(governor.votingPeriod(), 7 days);
  }

  function test_voting_extension() public {
    assertEq(governor.lateQuorumVoteExtension(), 1 days);
  }

  function test_proposal_threshold() public {
    assertEq(governor.proposalThreshold(), 10_000_000e18);
  }

  function test_quorum() public {
    assertEq(governor.quorum(), 40_000_000e18);

    vm.expectRevert();
    vm.prank(address(governor));
    governor.updateQuorum(50_000_000e18);
    assertEq(governor.quorum(), 40_000_000e18);
  }

  function test_set_voting_delay() public {
    address operator = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    bytes memory encodedError = abi.encodeWithSelector(IGovernor.GovernorOnlyExecutor.selector, operator);
    vm.expectRevert(encodedError);
    vm.prank(operator);
    governor.setVotingDelay(2 days);

    vm.expectRevert(DoubleEndedQueue.QueueEmpty.selector);
    vm.prank(address(controller));
    governor.setVotingDelay(2 days);
  }

  function test_propose() public {
    address proposer = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    address voter = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    address[] memory targets = new address[](1);
    targets[0] = address(governor);
    uint256[] memory values = new uint256[](1);
    values[0] = 0;
    bytes[] memory calldatas = new bytes[](1);
    calldatas[0] = abi.encodeWithSignature("updateQuorum(uint256)", 50_000_000e18);
    string memory description = "";
    uint256 proposalThreshold = 10_000_000e18;

    bytes memory encodedError = abi.encodeWithSelector(
      IGovernor.GovernorInsufficientProposerVotes.selector,
      proposer,
      0,
      proposalThreshold
    );
    vm.expectRevert(encodedError);
    vm.prank(proposer);
    governor.propose(targets, values, calldatas, description);

    _delegateVote(proposer, proposalThreshold);
    vm.prank(proposer);
    uint256 proposeId = governor.propose(targets, values, calldatas, description);

    vm.warp(block.timestamp + 1 days - 1);
    vm.roll(block.number + 1);
    encodedError = abi.encodeWithSelector(
      IGovernor.GovernorUnexpectedProposalState.selector,
      proposeId,
      governor.state(proposeId),
      _encodeStateBitmap(IGovernor.ProposalState.Active)
    );
    vm.expectRevert(encodedError);
    _castVote(proposer, proposeId, GovernorCountingSimple.VoteType.For);

    _delegateVote(voter, 3 * proposalThreshold);

    vm.warp(block.timestamp + 1);
    vm.roll(block.number + 1);
    _castVote(voter, proposeId, GovernorCountingSimple.VoteType.For);
    _castVote(proposer, proposeId, GovernorCountingSimple.VoteType.For);

    (uint256 againstVotes, uint256 forVotes, uint256 abstainVotes) = governor.proposalVotes(proposeId);
    assertEq(againstVotes, 0);
    assertEq(abstainVotes, 0);
    assertEq(forVotes, 4 * proposalThreshold);

    encodedError = abi.encodeWithSelector(
      IGovernor.GovernorUnexpectedProposalState.selector,
      proposeId,
      governor.state(proposeId),
      _encodeStateBitmap(IGovernor.ProposalState.Succeeded) |
        _encodeStateBitmap(IGovernor.ProposalState.Queued)
    );
    vm.expectRevert(encodedError);
    governor.execute(targets, values, calldatas, keccak256(bytes(description)));

    encodedError = abi.encodeWithSelector(
      IGovernor.GovernorUnexpectedProposalState.selector,
      proposeId,
      governor.state(proposeId),
      _encodeStateBitmap(IGovernor.ProposalState.Succeeded)
    );
    vm.expectRevert(encodedError);
    governor.queue(targets, values, calldatas, keccak256(bytes(description)));

    uint32 currentState1 = uint32(governor.state(proposeId));
    assertEq(currentState1, 1);

    uint256 quorumVotes = governor.quorum(block.timestamp);
    assertEq(quorumVotes, 4 * proposalThreshold);

    bool needsQueuing = governor.proposalNeedsQueuing(proposeId);
    assertTrue(needsQueuing);

    vm.warp(block.timestamp + 7 days - 1);
    vm.roll(block.number + 1);

    vm.expectRevert(encodedError);
    governor.queue(targets, values, calldatas, keccak256(bytes(description)));

    vm.warp(block.timestamp + 1);
    vm.roll(block.number + 1);
    governor.queue(targets, values, calldatas, keccak256(bytes(description)));

    vm.expectRevert();
    governor.execute(targets, values, calldatas, keccak256(bytes(description)));

    vm.warp(block.timestamp + 4 hours - 1);
    vm.roll(block.number + 1);
    vm.expectRevert();
    governor.execute(targets, values, calldatas, keccak256(bytes(description)));
    assertEq(governor.votingDelay(), 1 days);

    vm.warp(block.timestamp + 1);
    vm.roll(block.number + 1);
    governor.execute(targets, values, calldatas, keccak256(bytes(description)));
    assertEq(governor.quorum(), 50_000_000e18);
  }

  function test_cancel_propose() public {
    address proposer = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    address[] memory targets = new address[](1);
    targets[0] = address(governor);
    uint256[] memory values = new uint256[](1);
    values[0] = 0;
    bytes[] memory calldatas = new bytes[](1);
    calldatas[0] = abi.encodeWithSignature("setVotingDelay(uint48)", 4 days);
    string memory description = "test cancel propose";
    uint256 proposalThreshold = 10_000_000e18;

    _delegateVote(proposer, proposalThreshold);
    vm.prank(proposer);
    uint256 proposeId = governor.propose(targets, values, calldatas, description);

    IGovernor.ProposalState status1 = governor.state(proposeId);
    assertEq(uint32(status1), uint32(IGovernor.ProposalState.Pending));

    vm.prank(proposer);
    governor.cancel(targets, values, calldatas, keccak256(bytes(description)));

    IGovernor.ProposalState status2 = governor.state(proposeId);
    assertEq(uint32(status2), uint32(IGovernor.ProposalState.Canceled));
  }
}
