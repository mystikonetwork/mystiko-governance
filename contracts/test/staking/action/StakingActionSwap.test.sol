// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";

import "../../../contracts/staking/impl/StakingAction.sol";
import "../../../contracts/staking/libs/common/CustomErrors.sol";
import "../../../contracts/staking/mock/MockMystikoToken.sol";
import "../../../contracts/staking/impl/StakingToken.sol";
import "../utils/Random.sol";

contract StakingActionSwapTest is Test, Random {
  StakingAction public action;
  MockMystikoToken public XZK;
  StMystikoToken public stXZK;

  function setUp() public {
    XZK = new MockMystikoToken();
    stXZK = new StMystikoToken(address(XZK));
    action = new StakingAction(address(XZK), address(stXZK));
  }

  function test_swap_xzk_zero() public {
    address actor = vm.addr(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    address account = vm.addr(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    stXZK.grantRole(stXZK.STAKING_TOKEN_MINTER_ROLE(), actor);
    vm.prank(actor);
    stXZK.mint(address(account), 100);
    assertEq(action.swapToXZK(0), 0);
    vm.expectRevert(CustomErrors.UnexpectedError.selector);
    action.swapToStXZK(0);
  }

  function test_swap_reward_before_staking() public {
    assertEq(action.swapToStXZK(0), 0);
    assertEq(action.swapToXZK(0), 0);
    assertEq(action.swapToStXZK(1), 1);
    assertEq(action.swapToXZK(1), 1);
    assertEq(action.swapToStXZK(1000000000), 1000000000);
    assertEq(action.swapToXZK(1000000000), 1000000000);

    XZK.transfer(address(stXZK), 100);
    assertEq(action.swapToStXZK(1), 1);
    assertEq(action.swapToXZK(1), 1);

    address actor = vm.addr(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    address account = vm.addr(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    stXZK.grantRole(stXZK.STAKING_TOKEN_MINTER_ROLE(), actor);
    vm.prank(actor);
    stXZK.mint(address(account), 100);
    XZK.transfer(address(stXZK), 100);

    assertEq(action.swapToStXZK(1), 0);
    assertEq(action.swapToXZK(1), 2);
    assertEq(action.swapToStXZK(10), 5);
    assertEq(action.swapToXZK(5), 10);
    assertEq(action.swapToStXZK(100), 50);
    assertEq(action.swapToXZK(50), 100);

    XZK.transfer(address(stXZK), 100);
    assertEq(action.swapToStXZK(1), 0);
    assertEq(action.swapToXZK(1), 3);
    assertEq(action.swapToStXZK(10), 3);
    assertEq(action.swapToXZK(10), 30);
    assertEq(action.swapToStXZK(100), 33);
    assertEq(action.swapToXZK(100), 300);
    assertEq(action.swapToStXZK(1000), 333);
    assertEq(action.swapToXZK(1000), 3000);
  }

  function test_swap_staking_before_reward() public {
    address actor = vm.addr(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    address account = vm.addr(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    stXZK.grantRole(stXZK.STAKING_TOKEN_MINTER_ROLE(), actor);
    vm.prank(actor);
    stXZK.mint(address(account), 100);
    XZK.transfer(address(stXZK), 100);

    assertEq(action.swapToStXZK(0), 0);
    assertEq(action.swapToXZK(0), 0);
    assertEq(action.swapToStXZK(1), 1);
    assertEq(action.swapToXZK(1), 1);
    assertEq(action.swapToStXZK(1000000000), 1000000000);
    assertEq(action.swapToXZK(1000000000), 1000000000);

    XZK.transfer(address(stXZK), 100);
    assertEq(action.swapToStXZK(1), 0);
    assertEq(action.swapToXZK(1), 2);
    assertEq(action.swapToStXZK(10), 5);
    assertEq(action.swapToXZK(5), 10);
    assertEq(action.swapToStXZK(100), 50);
    assertEq(action.swapToXZK(50), 100);

    XZK.transfer(address(stXZK), 100);
    assertEq(action.swapToStXZK(1), 0);
    assertEq(action.swapToXZK(1), 3);
    assertEq(action.swapToStXZK(10), 3);
    assertEq(action.swapToXZK(10), 30);
    assertEq(action.swapToStXZK(100), 33);
    assertEq(action.swapToXZK(100), 300);
    assertEq(action.swapToStXZK(1000), 333);
    assertEq(action.swapToXZK(1000), 3000);
  }

  function test_swap_more_staking_and_reward() public {
    address actor = vm.addr(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    address account = vm.addr(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    stXZK.grantRole(stXZK.STAKING_TOKEN_MINTER_ROLE(), actor);
    vm.prank(actor);
    stXZK.mint(address(account), 100);
    XZK.transfer(address(stXZK), 100);

    assertEq(action.swapToStXZK(0), 0);
    assertEq(action.swapToXZK(0), 0);
    assertEq(action.swapToStXZK(1), 1);
    assertEq(action.swapToXZK(1), 1);
    assertEq(action.swapToStXZK(1000000000), 1000000000);
    assertEq(action.swapToXZK(1000000000), 1000000000);

    vm.prank(actor);
    stXZK.mint(address(this), 100);
    XZK.transfer(address(stXZK), 100);

    XZK.transfer(address(stXZK), 200);
    assertEq(action.swapToStXZK(1), 0);
    assertEq(action.swapToXZK(1), 2);
    assertEq(action.swapToStXZK(10), 5);
    assertEq(action.swapToXZK(10), 20);
    assertEq(action.swapToStXZK(100), 50);
    assertEq(action.swapToXZK(100), 200);

    vm.prank(actor);
    stXZK.mint(address(account), 100);
    XZK.transfer(address(stXZK), 200);

    assertEq(action.swapToStXZK(100), 50);
    assertEq(action.swapToXZK(100), 200);
    assertEq(action.swapToStXZK(10), 5);
    assertEq(action.swapToXZK(10), 20);
    assertEq(action.swapToStXZK(100), 50);
    assertEq(action.swapToXZK(100), 200);

    XZK.transfer(address(stXZK), 300);
    assertEq(action.swapToStXZK(1), 0);
    assertEq(action.swapToXZK(1), 3);
    assertEq(action.swapToStXZK(10), 3);
    assertEq(action.swapToXZK(10), 30);
    assertEq(action.swapToStXZK(100), 33);
    assertEq(action.swapToXZK(100), 300);
  }
}
