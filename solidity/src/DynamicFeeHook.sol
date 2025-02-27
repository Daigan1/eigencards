// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { Hooks } from "@uniswap/v4-core/src/libraries/Hooks.sol";
import { IAvsLogic } from "./interfaces/IAvsLogic.sol";
import { BaseHook } from "v4-periphery/src/utils/BaseHook.sol";
import { IPoolManager } from "v4-core/src/interfaces/IPoolManager.sol";
import {IAttestationCenter} from "./interfaces/IAttestationCenter.sol";
import {PoolKey} from "v4-core/src/types/PoolKey.sol";
import {BeforeSwapDelta, BeforeSwapDeltaLibrary} from "v4-core/src/types/BeforeSwapDelta.sol";

contract DynamicFeeHook is IAvsLogic, BaseHook {
    address public immutable ATTESTATION_CENTER; // orcale data
    uint24 public fee = 500; // Base fee in bips (e.g., 500 = 0.05%)
    bool public marketSentiment;

    event MarketSentiment(bool marketSentiment);
    event FeeUpdated(uint24 indexed fee);
    error OnlyAttestationCenter();

    constructor(address _attestationCenterAddress, IPoolManager _poolManager) BaseHook(_poolManager) {
        ATTESTATION_CENTER = _attestationCenterAddress;
    }

    function afterTaskSubmission(
        IAttestationCenter.TaskInfo calldata _taskInfo,
        bool _isApproved,
        bytes calldata, /* _tpSignature */
        uint256[2] calldata, /* _taSignature */
        uint256[] calldata /* _operatorIds */
    ) external {
        if (msg.sender != address(ATTESTATION_CENTER)) revert OnlyAttestationCenter();
        // decode the fee amount

        (bool _isBullish, uint24 _fee) = abi.decode(_taskInfo.data, (bool, uint24));

        if (_isApproved) { // checks if the data is new data
            if (_isBullish) {
                fee = _fee > 100 ? _fee - 100 : 100; // lower fees during bullish sentiment
            } else {
                fee = 3000; // higher fees during bearish sentiment; 3000 = 0.3%
            }
            emit FeeUpdated(_fee);
        }
    }

    function beforeTaskSubmission(
        IAttestationCenter.TaskInfo calldata _taskInfo,
        bool _isApproved,
        bytes calldata _tpSignature,
        uint256[2] calldata _taSignature,
        uint256[] calldata _attestersIds
    ) external {} 
    
    function getHookPermissions() public pure override returns (Hooks.Permissions memory) {
        return Hooks.Permissions({
            beforeInitialize: false,
            afterInitialize: true,
            beforeAddLiquidity: false,
            afterAddLiquidity: false,
            beforeRemoveLiquidity: false,
            afterRemoveLiquidity: false,
            beforeSwap: true,
            afterSwap: false,
            beforeDonate: false,
            afterDonate: false,
            beforeSwapReturnDelta: false,
            afterSwapReturnDelta: false,
            afterAddLiquidityReturnDelta: false,
            afterRemoveLiquidityReturnDelta: false
        });
    }

    function _beforeSwap(
        address, 
        PoolKey calldata key, 
        IPoolManager.SwapParams calldata, 
        bytes calldata
    ) internal virtual override onlyPoolManager returns (bytes4, BeforeSwapDelta, uint24) {
        poolManager.updateDynamicLPFee(key, fee);
        return (BaseHook.beforeSwap.selector, BeforeSwapDelta.wrap(0), fee);
    }

    function _afterInitialize(
        address, 
        PoolKey calldata key, 
        uint160, int24
    )  internal virtual override onlyPoolManager returns(bytes4) {
        uint24 INITIAL_FEE = 500; // 0.05%
        poolManager.updateDynamicLPFee(key, INITIAL_FEE);
        return BaseHook.afterInitialize.selector;
    }
}
