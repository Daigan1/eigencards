// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import { IERC20 } from "forge-std/interfaces/IERC20.sol";
import { IHooks } from "v4-core/src/interfaces/IHooks.sol";
import { Currency } from "v4-core/src/types/Currency.sol";

contract Config {
    /// @dev populated with default anvil addresses
    IERC20 constant token0 = IERC20(address(0x0165878A594ca255338adfa4d48449f69242Eb8F)); // 
    IERC20 constant token1 = IERC20(address(0x036CbD53842c5426634e7929541eC2318f3dCF7e)); // USDC on Base Sepolia
    IHooks constant hookContract = IHooks(address(0x0));

    Currency constant currency0 = Currency.wrap(address(token0));
    Currency constant currency1 = Currency.wrap(address(token1));
}