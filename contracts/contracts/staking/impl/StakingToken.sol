// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20, ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {IStakingToken} from "../interfaces/iStakingToken.sol";
import {CustomErrors} from "../libs/common/CustomErrors.sol";

contract StMystikoToken is ERC20, ERC20Permit, IStakingToken, AccessControl {
  using SafeERC20 for IERC20;

  bytes32 public constant STAKING_TOKEN_MINTER_ROLE = keccak256("STAKING_TOKEN_MINTER_ROLE");

  address public immutable XZK;

  event StXZKMinted(address indexed account, uint256 amount);
  event StXZKBurned(address indexed account, uint256 amount);

  constructor(
    address _xzk
  ) ERC20("Mystiko Staking Token", "stXZK") ERC20Permit("Mystiko Staking Token") AccessControl() {
    XZK = _xzk;
    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
  }

  function mint(address _account, uint256 _stXZKAmount) external {
    if (!hasRole(STAKING_TOKEN_MINTER_ROLE, msg.sender)) revert CustomErrors.OnlyMinter();
    _mint(_account, _stXZKAmount);
    emit StXZKMinted(_account, _stXZKAmount);
  }

  function burn(address _account, uint256 _stXzkAmount, uint256 _xzkAmount) external {
    if (!hasRole(STAKING_TOKEN_MINTER_ROLE, msg.sender)) revert CustomErrors.OnlyMinter();
    _burn(_account, _stXzkAmount);
    IERC20(XZK).safeTransfer(_account, _xzkAmount);
    emit StXZKBurned(_account, _stXzkAmount);
  }
}
