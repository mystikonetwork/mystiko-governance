// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import "../../../../contracts/token/MystikoVoteToken.sol";
import "../../../mock/MockMystikoToken.sol";
import "../../../../contracts/Settings/miner/impl/MystikoRollerRegistry.sol";
import "../../../../contracts/Settings/miner/proxy/MystikoRollerRegistryProxy.sol";
import "../../../../contracts/Settings/miner/interfaces/IMystikoRollerRegistry.sol";
import "../../../../contracts/governance/impl/MystikoGovernorCenter.sol";
import "../../../../contracts/libs/common/CustomErrors.sol";
import "../../../utils/Random.sol";

contract MystikoRollerRegistryTest is Test, Random {
  address public dao;
  MystikoRollerRegistryProxy public proxy;

  event RegistryChanged(address indexed registry);

  function setUp() public {
    dao = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));

    MockMystikoToken XZK = new MockMystikoToken();
    MystikoVoteToken vXZK = new MystikoVoteToken(XZK);
    MystikoGovernorCenter center = new MystikoGovernorCenter(dao);
    MystikoRollerRegistry registry = new MystikoRollerRegistry(address(center), address(vXZK), 1_000_000e18);
    proxy = new MystikoRollerRegistryProxy(address(center), address(registry));
  }

  function test_canDoRollup() public {
    address roller = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    address pool = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));

    CanDoRollupParams memory p1 = CanDoRollupParams({pool: pool, roller: roller, rollupSize: 1});
    vm.expectRevert(CustomErrors.UnauthorizedRole.selector);
    vm.prank(pool);
    proxy.canDoRollup(p1);
  }

  function test_changeRollerRegistry() public {
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
