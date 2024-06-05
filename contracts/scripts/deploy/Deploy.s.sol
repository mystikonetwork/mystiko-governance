// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../../contracts/impl/MystikoGovernorRegistry.sol";
import "../../contracts/token/MystikoVoteToken.sol";
import "../../contracts/impl/MystikoTimelockController.sol";
import "../../contracts/impl/MystikoGovernor.sol";
import {IERC20, ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DeployRegistry is Script {
  function run() external {
    vm.startBroadcast();
    MystikoGovernorRegistry registry = new MystikoGovernorRegistry();
    vm.stopBroadcast();
  }
}

contract DeployVoteToken is Script {
  function run() external {
    address XZK = vm.envAddress("XZK_ADDRESS");

    vm.startBroadcast();
    MystikoVoteToken voteToken = new MystikoVoteToken(IERC20(XZK));
    vm.stopBroadcast();
  }
}

contract DeployTimelock is Script {
  function run() external {
    vm.startBroadcast();
    MystikoTimelockController timelock = new MystikoTimelockController(5 minutes);
    vm.stopBroadcast();
  }
}

contract DeployGovernor is Script {
  function run() external {
    address voteToken = vm.envAddress("VOTE_XZK_ADDRESS");
    address payable timelock = payable(vm.envAddress("TIMELOCK_ADDRESS"));

    vm.startBroadcast();
    MystikoGovernor governor = new MystikoGovernor(
      MystikoVoteToken(voteToken),
      MystikoTimelockController(timelock)
    );
    vm.stopBroadcast();
  }
}
