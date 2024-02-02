// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MstkoToken is ERC20 {
  constructor() ERC20("Mystiko Token", "MSTKO") {
    _mint(msg.sender, 1000000000 * (10 ** 18));
  }
}
