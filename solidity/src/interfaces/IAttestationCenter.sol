// SPDX-License-Identifer: MIT

pragma solidity ^0.8.26;

interface IAttestationCenter {
    struct TaskInfo {
        string proofOfTask;
        bytes data;
        address taskPerformer;
        uint16 taskDefinitionId;
    }
    function setAvsLogic(address _avsLogic) external;
}