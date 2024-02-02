// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {Test} from "forge-std/Test.sol";

import "../../../contracts/staking/impl/StakingToken.sol";
import "../../../contracts/staking/libs/common/CustomErrors.sol";
import "../../../contracts/token/MstkoToken.sol";

contract StakingTokenTokenTest is Test {
  MstkoToken public mstko;
  StMstkoToken public stMstko;

  function setUp() public {
    mstko = new MstkoToken();
    stMstko = new StMstkoToken(address(mstko));
  }

  function test_token_name() public {
    assertEq(stMstko.name(), "Mystiko Staking Token");
  }

  function test_token_symbol() public {
    assertEq(stMstko.symbol(), "stMSTKO");
  }

  function test_token_decimal() public {
    assertEq(stMstko.decimals(), 18);
  }

  function test_token_total_supply() public {
    assertEq(stMstko.totalSupply(), 0);
  }
}
