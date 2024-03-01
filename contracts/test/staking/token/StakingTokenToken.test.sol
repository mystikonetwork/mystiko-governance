// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";

import "../../../contracts/staking/impl/StakingToken.sol";
import "../../../contracts/staking/libs/common/CustomErrors.sol";
import "../../../contracts/staking/mock/MockMystikoToken.sol";

contract StakingTokenTokenTest is Test {
  MockMystikoToken public XZK;
  StMystikoToken public stXZK;

  function setUp() public {
    XZK = new MockMystikoToken();
    stXZK = new StMystikoToken(address(XZK));
  }

  function test_token_name() public {
    assertEq(stXZK.name(), "Mystiko Staking Token");
  }

  function test_token_symbol() public {
    assertEq(stXZK.symbol(), "stXZK");
  }

  function test_token_decimal() public {
    assertEq(stXZK.decimals(), 18);
  }

  function test_token_total_supply() public {
    assertEq(stXZK.totalSupply(), 0);
  }
}
