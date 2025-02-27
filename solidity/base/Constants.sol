// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IPoolManager} from "v4-core/src/interfaces/IPoolManager.sol";
import {PositionManager} from "v4-periphery/src/PositionManager.sol";
import {IAllowanceTransfer} from "permit2/src/interfaces/IAllowanceTransfer.sol";

/// @notice Shared constants used in scripts
contract Constants {
    // https://book.getfoundry.sh/guides/deterministic-deployments-using-create2
    address constant CREATE2_DEPLOYER = address(0x4e59b44847b379578588920cA78FbF26c0B4956C); // default address of 

    /// @dev populated with default anvil addresses
    // https://docs.uniswap.org/contracts/v4/deployments
    IPoolManager constant POOLMANAGER = IPoolManager(address(0x05E73354cFDd6745C338b50BcFDfA3Aa6fA03408)); // base sepolia pool maanger on v4
    PositionManager constant posm = PositionManager(payable(address(0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0))); // replace with actual PositionManager address
    IAllowanceTransfer constant PERMIT2 = IAllowanceTransfer(address(0x000000000022D473030F116dDEE9F6B43aC78BA3));
}
