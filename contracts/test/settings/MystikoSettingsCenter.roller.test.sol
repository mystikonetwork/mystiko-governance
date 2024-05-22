// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import "../../contracts/settings/MystikoSettingsCenter.sol";
import "../../contracts/settings/rule/impl/CertificateRegistry.sol";
import "../../contracts/settings/miner/impl/MystikoRelayerRegistry.sol";
import "../../contracts/settings/miner/impl/MystikoRollerRegistry.sol";
import "../mock/MockMystikoToken.sol";
import "../../contracts/token/MystikoVoteToken.sol";
import "../../contracts/governance/impl/MystikoGovernorCenter.sol";
import "../utils/Random.sol";
import "../../contracts/settings/pool/interfaces/IMystikoVerifier.sol";

contract MystikoSettingsCenterTest is Test, Random {
  address public dao;
  address[11] public rollupVerifiers;
  address[6] public transactVerifiers;
  uint256[5] public auditors;
  CertificateRegistry public certificateRegistry;
  MystikoRollerRegistry public rollerRegistry;
  MystikoRelayerRegistry public relayerRegistry;
  MystikoSettingsCenter public settings;

  event RollerRegistryChanged(address indexed registry);

  function setUp() public {
    dao = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    for (uint256 i = 0; i < 11; i++) {
      rollupVerifiers[i] = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    }
    for (uint256 i = 0; i < 6; i++) {
      transactVerifiers[i] = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    }
    for (uint256 i = 0; i < 5; i++) {
      auditors[i] = uint256(keccak256(abi.encodePacked(_random())));
    }
    MockMystikoToken XZK = new MockMystikoToken();
    MystikoVoteToken vXZK = new MystikoVoteToken(XZK);
    MystikoGovernorCenter center = new MystikoGovernorCenter(dao);
    certificateRegistry = new CertificateRegistry(address(center), address(0));
    rollerRegistry = new MystikoRollerRegistry(address(center), address(vXZK), 100_000e18);
    relayerRegistry = new MystikoRelayerRegistry(address(center), address(vXZK), 100_000e18);

    settings = new MystikoSettingsCenter(
      address(center),
      ICertificate(certificateRegistry),
      IMystikoRoller(rollerRegistry),
      IMystikoRelayer(relayerRegistry),
      rollupVerifiers,
      transactVerifiers,
      auditors
    );
  }

  function test_can_do_rollup() public {
    address roller = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    address pool = address(uint160(uint256(keccak256(abi.encodePacked(_random())))));
    CanDoRollupParams memory p1 = CanDoRollupParams({pool: pool, roller: roller, rollupSize: 1});
    vm.expectRevert(GovernanceErrors.UnauthorizedRole.selector);
    vm.prank(pool);
    settings.canDoRollup(p1);

    vm.prank(dao);
    rollerRegistry.grantRole(roller);

    vm.expectRevert(GovernanceErrors.InsufficientBalanceForAction.selector);
    vm.prank(pool);
    settings.canDoRollup(p1);

    vm.prank(dao);
    rollerRegistry.changeRollerMinVoteTokenAmount(0);
    vm.prank(pool);
    bool canDo = settings.canDoRollup(p1);
    assertTrue(canDo);
  }

  function test_change_roller_registry() public {
    vm.expectRevert(GovernanceErrors.OnlyMystikoDAO.selector);
    settings.changeRollerRegistry(IMystikoRoller(rollerRegistry));

    vm.expectRevert(GovernanceErrors.NotChanged.selector);
    vm.prank(dao);
    settings.changeRollerRegistry(IMystikoRoller(rollerRegistry));

    IMystikoRoller newRegistry = IMystikoRoller(
      address(uint160(uint256(keccak256(abi.encodePacked(_random())))))
    );
    vm.expectEmit(address(settings));
    emit RollerRegistryChanged(address(newRegistry));
    vm.prank(dao);
    settings.changeRollerRegistry(newRegistry);
    assertEq(address(settings.rollerRegistry()), address(newRegistry));
  }
}
