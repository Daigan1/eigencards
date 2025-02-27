// SPDX-License-Identifier: MIT

pragma solidity ^0.8.26;

import "forge-std/Script.sol";
import {Hooks} from "v4-core/src/libraries/Hooks.sol";
import {IPoolManager} from "v4-core/src/interfaces/IPoolManager.sol";
import {IAttestationCenter} from "../src/interfaces/IAttestationCenter.sol";
import {HookMiner} from "v4-periphery/src/utils/HookMiner.sol";
import {DynamicFeeHook} from "../src/DynamicFeeHook.sol";

contract DynamicFeeHookScript is Script {
    function setup() public {}

    function run(
        address attestationCenter,
        address poolManager
    ) public {
        address C2Deployer = 0x4e59b44847b379578588920cA78FbF26c0B4956C; // not sure what this address is

        uint160 flags = uint160(Hooks.AFTER_INITIALIZE_FLAG | Hooks.BEFORE_SWAP_FLAG);
        bytes memory constructorArgs = abi.encode(attestationCenter, IPoolManager(poolManager));

        (address hookAddress, bytes32 salt) = 
            HookMiner.find(C2Deployer, flags, type(DynamicFeeHook).creationCode, constructorArgs);

        console.log("Mined hook address:", hookAddress);
        console.log("Salt:", vm.toString(salt));

        vm.startBroadcast();
        DynamicFeeHook hook = new DynamicFeeHook{salt: salt}(attestationCenter, IPoolManager(poolManager));

        require(address(hook) == hookAddress, "Hook address mismatch");

        IAttestationCenter(attestationCenter).setAvsLogic(address(hook));
        vm.stopBroadcast();
    }
}