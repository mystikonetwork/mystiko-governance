// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

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
    XZK.transfer(account, amount);
    vm.prank(account);
    XZK.approve(address(vXZK), amount);
    vm.prank(account);
    vXZK.depositFor(account, amount);

    uint256 balance = vXZK.balanceOf(account);
    assertEq(balance, amount);
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
    controller = new MystikoTimelockController(10);
    governor = new MystikoGovernor(vXZK, controller);
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
    assertEq(governor.votingPeriod(), 1 weeks);
  }

  function test_proposal_threshold() public {
    assertEq(governor.proposalThreshold(), 10_000_000e18);
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
    calldatas[0] = abi.encodeWithSignature("setVotingDelay(uint48)", 4 days);
    string memory description = "";
    uint256 proposalThreshold = 10_000_000e18;

    assertEq(governor.votingDelay(), 1 days);

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

    encodedError = abi.encodeWithSelector(
      IGovernor.GovernorUnexpectedProposalState.selector,
      proposeId,
      governor.state(proposeId),
      _encodeStateBitmap(IGovernor.ProposalState.Active)
    );
    vm.expectRevert(encodedError);
    _castVote(proposer, proposeId, GovernorCountingSimple.VoteType.For);

    vm.warp(block.timestamp + 1 days + 1);
    vm.roll(block.number + 1);
    _castVote(proposer, proposeId, GovernorCountingSimple.VoteType.For);

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

    _delegateVote(voter, 4 * 10_000_000e18);
    _castVote(voter, proposeId, GovernorCountingSimple.VoteType.For);

    vm.warp(block.timestamp + 7 days + 1);
    vm.roll(block.number + 1);
    governor.queue(targets, values, calldatas, keccak256(bytes(description)));

    vm.expectRevert();
    governor.execute(targets, values, calldatas, keccak256(bytes(description)));

    vm.warp(block.timestamp + 1 days + 1);
    vm.roll(block.number + 1);
    governor.execute(targets, values, calldatas, keccak256(bytes(description)));
    assertEq(governor.votingDelay(), 4 days);
  }
}
