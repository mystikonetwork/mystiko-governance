// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import "../../contracts/impl/MystikoGovernorRegistry.sol";
import "../../contracts/token/MystikoVoteToken.sol";
import "../../contracts/impl/MystikoTimelockController.sol";
import "../../contracts/impl/MystikoGovernor.sol";
import "../../test/mock/MockMystikoToken.sol";
import {IERC20, ERC20} from "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

contract DoProposal is Script {
  function run() external {
    vm.startBroadcast();
    address payable governor = payable(vm.envAddress("GOVERNOR_ADDRESS"));
    address XZK = vm.envAddress("XZK_ADDRESS");
    address voteXZK = vm.envAddress("VOTE_XZK_ADDRESS");
    address registry = vm.envAddress("DAO_REGISTRY_ADDRESS");

    uint256 amount = 40_000_000e18;
    bool approveSuccess = MockMystikoToken(XZK).approve(voteXZK, amount);
    MystikoVoteToken(voteXZK).depositFor(msg.sender, amount);
    MystikoVoteToken(voteXZK).delegate(msg.sender);

    address[] memory targets = new address[](1);
    targets[0] = registry;
    uint256[] memory values = new uint256[](1);
    values[0] = 0;
    bytes[] memory calldatas = new bytes[](1);
    calldatas[0] = abi.encodeWithSignature("setMystikoDAO(address)", msg.sender);
    string memory description = "1";

    uint256 proposeId = MystikoGovernor(governor).propose(targets, values, calldatas, description);
    uint256 proposeId = stringToUint(
      "82804626997117375916661719511327938773751139607068448929399508465320691248665"
    );
    MystikoGovernor(governor).castVote(proposeId, uint8(GovernorCountingSimple.VoteType.For));
    uint32 currentState1 = uint32(MystikoGovernor(governor).state(proposeId));
    console.log("Current state: ", currentState1);
    uint256 quorumStatus = MystikoGovernor(governor).quorum(block.timestamp - 10);
    console.log("quorumStatus state: ", quorumStatus);

    MystikoGovernor(governor).queue(targets, values, calldatas, keccak256(bytes(description)));
    MystikoGovernor(governor).execute(targets, values, calldatas, keccak256(bytes(description)));

    MystikoGovernor(governor).cancel(targets, values, calldatas, keccak256(bytes(description)));

    vm.stopBroadcast();
  }

  function stringToUint(string memory s) internal pure returns (uint256) {
    bytes memory b = bytes(s);
    uint256 result = 0;
    for (uint i = 0; i < b.length; i++) {
      uint8 digit = uint8(b[i]) - 48;
      require(digit >= 0 && digit <= 9, "Invalid character in string");
      result = result * 10 + digit;
    }
    return result;
  }
}
