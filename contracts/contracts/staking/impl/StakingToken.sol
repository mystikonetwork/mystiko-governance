// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import {IERC20, ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IStakingToken} from "../interfaces/iStakingToken.sol";
import {CustomErrors} from "../libs/common/CustomErrors.sol";

contract StMstkoToken is ERC20, IStakingToken, Ownable {
  using SafeERC20 for IERC20;

  address private mstko;
  address private minter;

  modifier onlyMinter() {
    if (msg.sender != minter) revert CustomErrors.OnlyMinter();
    _;
  }

  event MinterChanged(address indexed minter);
  event StMstkoMinted(uint256 amount);
  event StMstkoBurned(uint256 amount);

  constructor(address _mstko) ERC20("Mystiko Staking Token", "stMSTKO") Ownable() {
    mstko = _mstko;
  }

  function mint(address _account, uint256 _mintAmount, uint256 _mstkoAmount) external onlyMinter {
    IERC20(mstko).safeTransferFrom(_account, address(this), _mstkoAmount);
    _mint(_account, _mintAmount);
    emit StMstkoMinted(_mintAmount);
  }

  function burn(address _account, uint256 _burnAmount, uint256 _mstkoAmount) external onlyMinter {
    _burn(_account, _burnAmount);
    IERC20(mstko).safeTransfer(_account, _mstkoAmount);
    emit StMstkoBurned(_burnAmount);
  }

  function changeMinter(address _newMinter) external onlyOwner {
    if (minter == _newMinter) revert CustomErrors.NotChanged();
    minter = _newMinter;
    emit MinterChanged(minter);
  }
}
