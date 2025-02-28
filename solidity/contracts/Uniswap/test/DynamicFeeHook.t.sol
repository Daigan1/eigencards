// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import "../src/DynamicFeeHook.sol";

contract DynamicFeeHookTest is Test {
    DynamicFeeHook dynamicFeeHook;
    IPoolManager poolManager;
    address attestationCenter = address(0x123);

    function setUp() public {
        poolManager = IPoolManager(address(0x456));
        dynamicFeeHook = new DynamicFeeHook(attestationCenter, poolManager);
    }

    function testInitialFee() public view {
        assertEq(dynamicFeeHook.fee(), 500);
    }

    function testSetMarketSentiment() public {
        vm.prank(attestationCenter);
        dynamicFeeHook.afterTaskSubmission(
            IAttestationCenter.TaskInfo({
                proofOfTask: "bullish",
                data: abi.encode(true, 400),
                taskPerformer: address(0),
                taskDefinitionId: 1
            }),
            true,
            "",
            [uint256(0), uint256(0)],
            new uint256[](0)
        );
        assertEq(dynamicFeeHook.fee(), 300);
    }

    function testSetMarketSentimentBearish() public {
        vm.prank(attestationCenter);
        dynamicFeeHook.afterTaskSubmission(
            IAttestationCenter.TaskInfo({
                proofOfTask: "bearish",
                data: abi.encode(true, 400),
                taskPerformer: address(0),
                taskDefinitionId: 1
            }),
            true,
            "",
            [uint256(0), uint256(0)],
            new uint256[](0)
        );
        assertEq(dynamicFeeHook.fee(), 3000);
    }

    function testOnlyAttestationCenterCanSetMarketSentiment() public {
        vm.expectRevert(DynamicFeeHook.OnlyAttestationCenter.selector);
        dynamicFeeHook.afterTaskSubmission(
            IAttestationCenter.TaskInfo({
                proofOfTask: "bullish",
                data: abi.encode(true, 400),
                taskPerformer: address(0),
                taskDefinitionId: 1
            }),
            true,
            "",
            [uint256(0), uint256(0)],
            new uint256[](0)
        );
    }
}