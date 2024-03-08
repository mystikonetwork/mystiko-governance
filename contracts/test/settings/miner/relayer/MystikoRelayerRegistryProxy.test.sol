// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import "../../../../contracts/token/MystikoVoteToken.sol";
import "../../../mock/MockMystikoToken.sol";
import "../../../../contracts/Settings/miner/impl/MystikoRelayerRegistry.sol";
import "../../../../contracts/Settings/miner/proxy/MystikoRelayerRegistryProxy.sol";
import "../../../../contracts/Settings/miner/interfaces/IMystikoRelayerRegistry.sol";
import "../../../../contracts/governance/impl/MystikoGovernorCenter.sol";
import "../../../../contracts/libs/common/CustomErrors.sol";
import "../../../utils/Random.sol";

contract MystikoRelayerRegistryTest is Test, Random {
  address public dao;
  MystikoRelayerRegistryProxy public proxy;

  event RegistryChanged(address indexed registry);

  function setUp() public {
    dao = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));

    MockMystikoToken XZK = new MockMystikoToken();
    MystikoVoteToken vXZK = new MystikoVoteToken(XZK);
    MystikoGovernorCenter center = new MystikoGovernorCenter(dao);
    MystikoRelayerRegistry registry = new MystikoRelayerRegistry(address(center), address(vXZK), 100_000e18);
    proxy = new MystikoRelayerRegistryProxy(address(center), address(registry));
  }

  function test_canDoRollup() public {
    address relayer = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    address pool = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));

    CanDoRelayParams memory p1 = CanDoRelayParams({pool: pool, relayer: relayer});
    vm.expectRevert(CustomErrors.UnauthorizedRole.selector);
    vm.prank(pool);
    proxy.canDoRelay(p1);
  }

  function test_changeRelayerRegistry() public {
    address registry = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    address operator = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    vm.expectRevert(CustomErrors.OnlyMystikoDAO.selector);
    vm.prank(operator);
    proxy.changeRegistry(registry);

    address oldRegistry = proxy.registry();
    vm.expectRevert(CustomErrors.NotChanged.selector);
    vm.prank(dao);
    proxy.changeRegistry(oldRegistry);

    vm.expectEmit(address(proxy));
    emit RegistryChanged(registry);
    vm.prank(dao);
    proxy.changeRegistry(registry);
    assertEq(proxy.registry(), registry);
  }
}
