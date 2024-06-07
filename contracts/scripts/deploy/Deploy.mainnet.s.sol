// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

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
    MystikoTimelockController timelock = new MystikoTimelockController(4 hours);
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
      MystikoTimelockController(timelock),
      1 days,
      7 days,
      1 days
    );
    MystikoTimelockController(timelock).grantGovernorRole(address(governor));
    vm.stopBroadcast();
  }
}

contract SetTimelockRole is Script {
  function run() external {
    address payable timelock = payable(vm.envAddress("TIMELOCK_ADDRESS"));
    address governor = vm.envAddress("GOVERNOR_ADDRESS");

    vm.startBroadcast();
    MystikoTimelockController(timelock).grantGovernorRole(governor);
    vm.stopBroadcast();
  }
}
