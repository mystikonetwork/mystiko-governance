// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../../../contracts/staking/impl/StakingToken.sol";
import "../../../contracts/staking/mock/MockMystikoToken.sol";
import "../../../contracts/staking/libs/common/CustomErrors.sol";
import "../utils/Random.sol";

contract StakingTokenAccessTest is Test, Random {
  MockMystikoToken public XZK;
  StMystikoToken public stXZK;

  function setUp() public {
    XZK = new MockMystikoToken();
    stXZK = new StMystikoToken(address(XZK));
  }

  function test_default_admin_role() public {
    bytes32 admin = stXZK.getRoleAdmin(stXZK.DEFAULT_ADMIN_ROLE());
    assertEq(admin, stXZK.DEFAULT_ADMIN_ROLE());
    bytes32 adminMinter = stXZK.getRoleAdmin(stXZK.STAKING_TOKEN_MINTER_ROLE());
    assertEq(adminMinter, stXZK.DEFAULT_ADMIN_ROLE());

    bool bAdminRole = stXZK.hasRole(stXZK.DEFAULT_ADMIN_ROLE(), address(this));
    assertTrue(bAdminRole);
    bool bActorRole = stXZK.hasRole(stXZK.STAKING_TOKEN_MINTER_ROLE(), address(this));
    assertFalse(bActorRole);
  }

  event RoleGranted(bytes32 indexed role, address indexed account, address indexed sender);
  event RoleRevoked(bytes32 indexed role, address indexed account, address indexed sender);

  function test_grant_and_revoke_admin_role() public {
    address admin = payable(address(uint160(uint256(keccak256(abi.encodePacked(_random()))))));
    vm.expectEmit(address(stXZK));
    emit RoleGranted(stXZK.DEFAULT_ADMIN_ROLE(), admin, address(this));
    stXZK.grantRole(stXZK.DEFAULT_ADMIN_ROLE(), admin);
    bool bAdminRole1 = stXZK.hasRole(stXZK.DEFAULT_ADMIN_ROLE(), address(admin));
    assertTrue(bAdminRole1);

    vm.expectEmit(address(stXZK));
    emit RoleRevoked(stXZK.DEFAULT_ADMIN_ROLE(), admin, address(this));
    stXZK.revokeRole(stXZK.DEFAULT_ADMIN_ROLE(), admin);
    bool bAdminRole2 = stXZK.hasRole(stXZK.DEFAULT_ADMIN_ROLE(), address(admin));
    assertFalse(bAdminRole2);
  }

  function test_grant_and_revoke_minter_role() public {
    address minter = payable(address(uint160(uint256(keccak256(abi.encodePacked(_random()))))));
    vm.expectRevert(CustomErrors.OnlyMinter.selector);
    vm.prank(minter);
    stXZK.mint(minter, 1);
    vm.expectRevert(CustomErrors.OnlyMinter.selector);
    vm.prank(minter);
    stXZK.burn(minter, 1, 1);

    vm.expectEmit(address(stXZK));
    emit RoleGranted(stXZK.STAKING_TOKEN_MINTER_ROLE(), minter, address(this));
    stXZK.grantRole(stXZK.STAKING_TOKEN_MINTER_ROLE(), minter);
    bool bAdminRole1 = stXZK.hasRole(stXZK.STAKING_TOKEN_MINTER_ROLE(), address(minter));
    assertTrue(bAdminRole1);

    IERC20(XZK).transfer(address(stXZK), 1);
    vm.prank(minter);
    stXZK.mint(minter, 1);
    vm.prank(minter);
    stXZK.burn(minter, 1, 1);

    vm.expectEmit(address(stXZK));
    emit RoleRevoked(stXZK.STAKING_TOKEN_MINTER_ROLE(), minter, address(this));
    stXZK.revokeRole(stXZK.STAKING_TOKEN_MINTER_ROLE(), minter);
    bool bAdminRole2 = stXZK.hasRole(stXZK.STAKING_TOKEN_MINTER_ROLE(), address(minter));
    assertFalse(bAdminRole2);

    vm.expectRevert(CustomErrors.OnlyMinter.selector);
    vm.prank(minter);
    stXZK.mint(minter, 1);
    vm.expectRevert(CustomErrors.OnlyMinter.selector);
    vm.prank(minter);
    stXZK.burn(minter, 1, 1);
  }
}
