// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

// import "forge-std/Test.sol";
// import "../src/DeployLiquidityPool.sol";

// contract DeployLiquidityPoolTest is Test {
//     DeployLiquidityPool deployer;
//     IPoolManager poolManager;

//     function setUp() public {
//         address mockPoolManager = address(0xC380afBeE4D1745AaC5b74098fa06e0b97cd5C52); // You still need a valid address here
//         deployer = new DeployLiquidityPool(mockPoolManager);
//         poolManager = IPoolManager(mockPoolManager); // Cast the mockPoolManager address
//     }

//     function testCreateLiquidity() public {
//         address tokenA = address(0x1);
//         address tokenB = address(0x2);
//         uint24 fee = 3000;
//         uint16 tickSpacing = 60;

//         // Expect a revert when calling createLiquidityPool (PoolManager not actually deployed)
//         vm.expectRevert(); // Expect *any* revert
//         deployer.createLiquidityPool(tokenA, tokenB, fee, tickSpacing);
//     }
// }
