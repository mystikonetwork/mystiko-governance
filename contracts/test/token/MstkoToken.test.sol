// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {Test} from "forge-std/Test.sol";

import {MstkoToken} from "../../contracts/token/MstkoToken.sol";

contract MstkoTokenTest is Test {
  MstkoToken public mstko;

  function setUp() public {
    mstko = new MstkoToken();
  }

  function test_token_name() public {
    assertEq(mstko.name(), "Mystiko Token");
  }

  function test_token_symbol() public {
    assertEq(mstko.symbol(), "MSTKO");
  }

  function test_token_decimal() public {
    assertEq(mstko.decimals(), 18);
  }

  function test_token_total_supply() public {
    assertEq(mstko.totalSupply(), 1000000000 * (10 ** 18));
    assertEq(mstko.balanceOf(address(this)), 1000000000 * (10 ** 18));
  }
}
