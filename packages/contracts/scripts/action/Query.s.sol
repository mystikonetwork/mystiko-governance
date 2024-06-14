// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import "../../contracts/impl/MystikoGovernorRegistry.sol";
import "../../contracts/token/MystikoVoteToken.sol";
import "../../contracts/impl/MystikoTimelockController.sol";
import "../../contracts/impl/MystikoGovernor.sol";
import "../../test/mock/MockMystikoToken.sol";
import {IERC20, ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract QueryRegistry is Script {
  function run() external {
    vm.startBroadcast();
      address registry = vm.envAddress("DAO_REGISTRY_ADDRESS");
      address dao = MystikoGovernorRegistry(registry).dao();
      console.log("DAO: ", dao);
      vm.stopBroadcast();
  }
}
