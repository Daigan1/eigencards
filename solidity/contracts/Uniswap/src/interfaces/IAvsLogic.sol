// SPDX-License-Identifier: MIT

pragma solidity ^0.8.26;

import "./IAttestationCenter.sol";

interface IAvsLogic {
    function beforeTaskSubmission(
        IAttestationCenter.TaskInfo calldata _taskInfo, 
        bool _isApproved, 
        bytes calldata _tpSignature, 
        uint256[2] calldata _taSignature, 
        uint256[] calldata _attestersIds
    ) external;
}