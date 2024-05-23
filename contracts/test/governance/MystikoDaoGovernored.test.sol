// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {MystikoGovernorCenter} from "../../contracts/impl/MystikoGovernorCenter.sol";
import {GovernanceErrors} from "../../contracts/GovernanceErrors.sol";
import {MystikoDAOGoverned} from "../../contracts/MystikoDAOGoverned.sol";
import "../utils/Random.sol";

contract MockGovernedTest is MystikoDAOGoverned {
  constructor(address _daoCenter) MystikoDAOGoverned(_daoCenter) {}
  function update() public view onlyMystikoDAO returns (bool) {
    return true;
  }
}

contract MystikoDAOGovernedTest is Test, Random {
  MystikoGovernorCenter public center;
  address public dao;
  MockGovernedTest public mock;

  function setUp() public {
    dao = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    center = new MystikoGovernorCenter(dao);
    mock = new MockGovernedTest(address(center));
  }

  function test_update() public {
    vm.expectRevert(GovernanceErrors.OnlyMystikoDAO.selector);
    mock.update();

    vm.prank(dao);
    bool result = mock.update();
    assertTrue(result);
  }
}
