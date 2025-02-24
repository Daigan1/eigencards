// SPDX-License-Identifier: MIT

//https://docs.uniswap.org/contracts/v4/quickstart/create-pool
pragma solidity ^0.8.21;

import { PoolKey } from "v4-core/src/types/PoolKey.sol";


PoolKey memory pool = PoolKey({
    currency0: currency0, // WETH
    currency1: currency1, // USDC
    fee: lpFee,
    tickSpacing: tickSpacing, // 10
    hooks: hookContract
});