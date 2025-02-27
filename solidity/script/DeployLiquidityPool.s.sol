// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "forge-std/Script.sol";
import "../src/DeployLiquidityPool.sol";

contract DeployLiquidityPoolScript is Script {
    function run() external {
        vm.startBroadcast();

        address poolManagerAddress = 0xC380afBeE4D1745AaC5b74098fa06e0b97cd5C52;
        DeployLiquidityPool deployer = new DeployLiquidityPool(poolManagerAddress);

        console.log("Liquidity pool deployed at", address(deployer));

        address tokenA = 0x0000000000000000000000000000000000001010;
        address tokenB = 0x036CbD53842c5426634e7929541eC2318f3dCF7e;
        uint24 fee = 3000;
        uint16 tickSpacing = 60;

        address pool = deployer.createLiquidityPool(tokenA, tokenB, fee, tickSpacing);
        console.log("Liquidity pool created at", pool);

        vm.stopBroadcast();
    }
}