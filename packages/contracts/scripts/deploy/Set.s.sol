// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "forge-std/Script.sol";
import "../../contracts/impl/MystikoGovernorRegistry.sol";
import "../../contracts/token/MystikoVoteToken.sol";
import "../../contracts/impl/MystikoTimelockController.sol";
import "../../contracts/impl/MystikoGovernor.sol";
import {IERC20, ERC20} from "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

contract SetTimelockRole is Script {
  function run() external {
    address payable timelock = payable(vm.envAddress("TIMELOCK_ADDRESS"));
    address governor = vm.envAddress("GOVERNOR_ADDRESS");

    vm.startBroadcast();
    MystikoTimelockController(timelock).grantGovernorRole(governor);
    vm.stopBroadcast();
  }
}

contract TransferRegistryDao is Script {
  function run() external {
    address registryAddress = vm.envAddress("DAO_REGISTRY_ADDRESS");
    address timelock = vm.envAddress("TIMELOCK_ADDRESS");

    vm.startBroadcast();
    MystikoGovernorRegistry(registryAddress).transferOwnerToDAO(timelock);
    vm.stopBroadcast();
  }
}
