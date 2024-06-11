// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Test} from "forge-std/Test.sol";
import {TimelockController} from "@openzeppelin/contracts/governance/TimelockController.sol";
import {IAccessControl} from "@openzeppelin/contracts/access/IAccessControl.sol";
import "../../../contracts/impl/MystikoTimelockController.sol";
import "../../utils/Random.sol";

contract MystikoTimelockControllerTest is Test, Random {
  MystikoTimelockController public controller;
  address public admin;
  address public governor;

  event Cancelled(bytes32 indexed id);

  function _encodeStateBitmap(
    TimelockController.OperationState operationState
  ) internal pure returns (bytes32) {
    return bytes32(1 << uint8(operationState));
  }

  function setUp() public {
    admin = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    governor = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    vm.prank(admin);
    controller = new MystikoTimelockController(10);
    vm.prank(admin);
    controller.grantGovernorRole(governor);
  }

  function test_construct_default_role() public {
    address admin1 = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    vm.prank(admin1);
    MystikoTimelockController controller1 = new MystikoTimelockController(10);

    bool hasRole = controller1.hasRole(controller1.PROPOSER_ROLE(), admin);
    assertFalse(hasRole);
    hasRole = controller1.hasRole(controller1.EXECUTOR_ROLE(), admin);
    assertFalse(hasRole);
    hasRole = controller1.hasRole(controller1.CANCELLER_ROLE(), admin);
    assertFalse(hasRole);
    hasRole = controller1.hasRole(controller1.DEFAULT_ADMIN_ROLE(), admin);
    assertFalse(hasRole);

    hasRole = controller1.hasRole(controller1.PROPOSER_ROLE(), address(controller1));
    assertFalse(hasRole);
    hasRole = controller1.hasRole(controller1.EXECUTOR_ROLE(), address(controller1));
    assertFalse(hasRole);
    hasRole = controller1.hasRole(controller1.CANCELLER_ROLE(), address(controller1));
    assertFalse(hasRole);
    hasRole = controller1.hasRole(controller1.DEFAULT_ADMIN_ROLE(), address(controller1));
    assertTrue(hasRole);

    hasRole = controller1.hasRole(controller1.PROPOSER_ROLE(), admin1);
    assertFalse(hasRole);
    hasRole = controller1.hasRole(controller1.EXECUTOR_ROLE(), admin1);
    assertFalse(hasRole);
    hasRole = controller1.hasRole(controller1.CANCELLER_ROLE(), admin1);
    assertFalse(hasRole);
    hasRole = controller1.hasRole(controller1.DEFAULT_ADMIN_ROLE(), admin1);
    assertTrue(hasRole);
  }

  function test_grant_governor_role() public {
    bool hasRole = controller.hasRole(controller.PROPOSER_ROLE(), governor);
    assertTrue(hasRole);
    hasRole = controller.hasRole(controller.EXECUTOR_ROLE(), governor);
    assertTrue(hasRole);
    hasRole = controller.hasRole(controller.CANCELLER_ROLE(), governor);
    assertTrue(hasRole);
    hasRole = controller.hasRole(controller.DEFAULT_ADMIN_ROLE(), address(controller));
    assertTrue(hasRole);
    hasRole = controller.hasRole(controller.DEFAULT_ADMIN_ROLE(), governor);
    assertFalse(hasRole);
    hasRole = controller.hasRole(controller.DEFAULT_ADMIN_ROLE(), admin);
    assertFalse(hasRole);
  }

  function test_schedule_and_execute() public {
    address account = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    address target = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));

    bytes memory encodedError = abi.encodeWithSelector(
      IAccessControl.AccessControlUnauthorizedAccount.selector,
      account,
      controller.PROPOSER_ROLE()
    );
    vm.expectRevert(encodedError);
    vm.prank(account);
    controller.schedule(target, 0, "", bytes32(0), bytes32(0), 1 days);

    bytes32 id = controller.hashOperation(target, 0, "", bytes32(0), bytes32(0));
    vm.prank(governor);
    controller.schedule(target, 0, "", bytes32(0), bytes32(0), 1 days);
    assert(controller.getOperationState(id) == TimelockController.OperationState.Waiting);

    encodedError = abi.encodeWithSelector(
      IAccessControl.AccessControlUnauthorizedAccount.selector,
      account,
      controller.EXECUTOR_ROLE()
    );
    vm.expectRevert(encodedError);
    vm.prank(account);
    controller.execute(target, 0, "", bytes32(0), bytes32(0));

    encodedError = abi.encodeWithSelector(
      TimelockController.TimelockUnexpectedOperationState.selector,
      id,
      _encodeStateBitmap(TimelockController.OperationState.Ready)
    );
    vm.expectRevert(encodedError);
    vm.prank(governor);
    controller.execute(target, 0, "", bytes32(0), bytes32(0));
  }

  function test_schedule_and_cancel() public {
    address account = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    address target = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));

    bytes32 id = controller.hashOperation(target, 0, "", bytes32(0), bytes32(0));
    vm.prank(governor);
    controller.schedule(target, 0, "", bytes32(0), bytes32(0), 1 days);
    assert(controller.getOperationState(id) == TimelockController.OperationState.Waiting);

    bytes memory encodedError = abi.encodeWithSelector(
      IAccessControl.AccessControlUnauthorizedAccount.selector,
      account,
      controller.CANCELLER_ROLE()
    );
    vm.expectRevert(encodedError);
    vm.prank(account);
    controller.cancel(id);

    vm.expectEmit(address(controller));
    emit Cancelled(id);
    vm.prank(governor);
    controller.cancel(id);
    assert(controller.getOperationState(id) == TimelockController.OperationState.Unset);
  }

  function test_schedule_and_execute_batch() public {
    address account = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    address target = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    address[] memory targets = new address[](1);
    targets[0] = target;
    uint256[] memory values = new uint256[](1);
    values[0] = 0;
    bytes[] memory payloads = new bytes[](1);
    payloads[0] = "";

    bytes memory encodedError = abi.encodeWithSelector(
      IAccessControl.AccessControlUnauthorizedAccount.selector,
      account,
      controller.PROPOSER_ROLE()
    );
    vm.expectRevert(encodedError);
    vm.prank(account);
    controller.scheduleBatch(targets, values, payloads, bytes32(0), bytes32(0), 1 days);

    bytes32 id = controller.hashOperationBatch(targets, values, payloads, bytes32(0), bytes32(0));
    vm.prank(governor);
    controller.scheduleBatch(targets, values, payloads, bytes32(0), bytes32(0), 1 days);
    assert(controller.getOperationState(id) == TimelockController.OperationState.Waiting);

    encodedError = abi.encodeWithSelector(
      IAccessControl.AccessControlUnauthorizedAccount.selector,
      account,
      controller.EXECUTOR_ROLE()
    );
    vm.expectRevert(encodedError);
    vm.prank(account);
    controller.executeBatch(targets, values, payloads, bytes32(0), bytes32(0));

    encodedError = abi.encodeWithSelector(
      TimelockController.TimelockUnexpectedOperationState.selector,
      id,
      _encodeStateBitmap(TimelockController.OperationState.Ready)
    );
    vm.expectRevert(encodedError);
    vm.prank(governor);
    controller.executeBatch(targets, values, payloads, bytes32(0), bytes32(0));
  }

  function test_update_delay() public {
    address account = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    bytes memory encodedError = abi.encodeWithSelector(
      TimelockController.TimelockUnauthorizedCaller.selector,
      account
    );
    vm.expectRevert(encodedError);
    vm.prank(account);
    controller.updateDelay(20);

    encodedError = abi.encodeWithSelector(TimelockController.TimelockUnauthorizedCaller.selector, governor);
    vm.expectRevert(encodedError);
    vm.prank(governor);
    controller.updateDelay(20);

    vm.prank(address(controller));
    controller.updateDelay(1234);
    assertEq(controller.getMinDelay(), 1234);
  }
}
