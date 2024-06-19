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
  uint256 public PROPOSAL_THRESHOLD = 1_000_000e18;

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

  function vote_one_round(uint32 pass, uint32 against, bool bSuccess) public {
    address proposer = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    address voter = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    address[] memory targets = new address[](1);
    targets[0] = address(governor);
    uint256[] memory values = new uint256[](1);
    values[0] = 0;
    bytes[] memory calldatas = new bytes[](1);
    calldatas[0] = abi.encodeWithSignature("updateQuorumNumerator(uint256)", 15 + pass);
    string memory description = string(abi.encodePacked(_random()));

    _delegateVote(proposer, pass * PROPOSAL_THRESHOLD);
    _delegateVote(voter, against * PROPOSAL_THRESHOLD);

    vm.prank(proposer);
    uint256 proposeId = governor.propose(targets, values, calldatas, description);

    vm.warp(block.timestamp + 1 days + 1);
    vm.roll(block.number + 1);

    _castVote(proposer, proposeId, GovernorCountingSimple.VoteType.For);
    _castVote(voter, proposeId, GovernorCountingSimple.VoteType.Against);

    (uint256 againstVotes, uint256 forVotes, uint256 abstainVotes) = governor.proposalVotes(proposeId);
    assertEq(againstVotes, against * PROPOSAL_THRESHOLD);
    assertEq(abstainVotes, 0);
    assertEq(forVotes, pass * PROPOSAL_THRESHOLD);

    vm.warp(block.timestamp + 7 days + 1);
    vm.roll(block.number + 1);

    if (bSuccess) {
      vm.prank(proposer);
      governor.queue(targets, values, calldatas, keccak256(bytes(description)));
      vm.warp(block.timestamp + 1 days + 1);
      vm.roll(block.number + 1);
      governor.execute(targets, values, calldatas, keccak256(bytes(description)));

      uint32 currentState1 = uint32(governor.state(proposeId));
      assertEq(currentState1, uint32(IGovernor.ProposalState.Executed));
      assertEq(governor.quorumNumerator(), 15 + pass);
    } else {
      uint32 currentState1 = uint32(governor.state(proposeId));
      assertEq(currentState1, uint32(IGovernor.ProposalState.Defeated));

      vm.expectRevert();
      governor.queue(targets, values, calldatas, keccak256(bytes(description)));
    }
  }

  function test_vote_quorum() public {
    vote_one_round(4, 1, true);
    vote_one_round(5, 4, true);
    vote_one_round(6, 6, false);
    vote_one_round(7, 8, false);
  }
}
