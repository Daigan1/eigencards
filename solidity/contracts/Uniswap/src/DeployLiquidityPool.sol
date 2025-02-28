// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IPoolManager {
    function createPool(
        address tokenA,
        address tokenB,
        uint24 fee,
        uint16 tickSpacing,
        address hook
    ) external returns (address pool);
}

contract DeployLiquidityPool {
    address public poolManagerAddress;

    constructor(address _poolManagerAddress) {
        require(_poolManagerAddress != address(0), "Invalid pool manager address");
        poolManagerAddress = _poolManagerAddress;
    }

    function createLiquidityPool(
        address tokenA,
        address tokenB,
        uint24 fee,
        uint16 tickSpacing
    ) public returns (address) {
        require(tokenA != address(0), "Invalid tokenA address");
        require(tokenB != address(0), "Invalid tokenB address");
        require(fee > 0, "Invalid fee");
        require(tickSpacing > 0, "Invalid tickSpacing");

        IPoolManager poolManager = IPoolManager(poolManagerAddress);
        address pool = poolManager.createPool(tokenA, tokenB, fee, tickSpacing, address(0)); 
        require(pool != address(0), "pool created failed");

        return pool;       
    }

}