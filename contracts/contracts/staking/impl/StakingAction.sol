// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IStakingAction} from "../interfaces/iStakingAction.sol";
import {IStakingToken} from "../interfaces/iStakingToken.sol";
import {CustomErrors} from "../libs/common/CustomErrors.sol";

contract StakingAction is IStakingAction, Pausable, Ownable {
  using SafeERC20 for IERC20;

  address public immutable XZK;
  address public immutable ST_XZK;

  constructor(address _xzk, address _stXzk) Ownable(msg.sender) {
    XZK = _xzk;
    ST_XZK = _stXzk;
  }

  function stake(uint256 _amount) external whenNotPaused {
    uint256 mintAmount = _swapStXZK(_amount);
    IERC20(XZK).safeTransferFrom(msg.sender, address(ST_XZK), _amount);
    IStakingToken(ST_XZK).mint(msg.sender, mintAmount);
  }

  function withdraw(uint256 _amount) external whenNotPaused {
    uint256 recvXZK = _swapXZK(_amount);
    IStakingToken(ST_XZK).burn(msg.sender, _amount, recvXZK);
  }

  function swapToStXZK(uint256 _amount) external view returns (uint256) {
    return _swapStXZK(_amount);
  }

  function swapToXZK(uint256 _amount) external view returns (uint256) {
    return _swapXZK(_amount);
  }

  function pause() external onlyOwner {
    _pause();
  }

  function unpause() external onlyOwner {
    _unpause();
  }

  function _swapStXZK(uint256 _amount) internal view returns (uint256) {
    uint256 totalStXZK = _getTotalStXZK();
    uint256 poolXZK = _getPoolXZK();
    if (totalStXZK == 0) {
      return _amount;
    } else {
      if (poolXZK == 0) revert CustomErrors.UnexpectedError();
      return (_amount * totalStXZK) / poolXZK;
    }
  }

  function _swapXZK(uint256 _amount) internal view returns (uint256) {
    uint256 totalStXZK = _getTotalStXZK();
    uint256 poolXZK = _getPoolXZK();
    return totalStXZK == 0 ? _amount : (_amount * poolXZK) / totalStXZK;
  }

  function _getTotalStXZK() internal view returns (uint256) {
    return IERC20(ST_XZK).totalSupply();
  }

  function _getPoolXZK() internal view returns (uint256) {
    return IERC20(XZK).balanceOf(ST_XZK);
  }
}
