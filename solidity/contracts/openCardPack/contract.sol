// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./IAvsLogic.sol";

contract OpenCardPack is ERC721URIStorage, ERC721Enumerable, IAvsLogic {
    address public immutable attestationCenter;
    uint256 private _tokenIds;

    event generateCommon(address sender);
    event generateEpic(address sender);
    event generateLegendary(address sender);

    constructor(address _attestationCenter) ERC721("Cards", "Cards") {
        attestationCenter = _attestationCenter;
    }

    function afterTaskSubmission(
        IAttestationCenter.TaskInfo calldata _taskInfo,
        bool _isApproved,
        bytes calldata /* _tpSignature */,
        uint256[2] calldata /* _taSignature */,
        uint256[] calldata /* _operatorIds */
    ) external {
        string[] memory links = decodeData(_taskInfo);
        address user = stringToAddress(links[0]);
        for (uint256 i = 1; i < links.length; i++) {
            _tokenIds++;
            uint256 newItemId = _tokenIds;

            // Mint the token and set its URI
            _safeMint(user, newItemId);
            _setTokenURI(newItemId, links[i]);
        }
    }

    function beforeTaskSubmission(
        IAttestationCenter.TaskInfo calldata _taskInfo,
        bool _isApproved,
        bytes calldata _tpSignature,
        uint256[2] calldata _taSignature,
        uint256[] calldata _operatorIds
    ) external {
        // empty
    }

    function stringToAddress(
        string memory str
    ) internal pure returns (address) {
        bytes memory strBytes = bytes(str);
        require(strBytes.length == 42, "Invalid address length"); // Ethereum address length is 42 characters (including "0x")

        uint160 result;
        for (uint256 i = 2; i < 42; i++) {
            // Start from index 2 to skip "0x"
            uint8 currentByte = uint8(strBytes[i]);
            result *= 16;
            if (currentByte >= 48 && currentByte <= 57) {
                // '0' to '9'
                result += currentByte - 48;
            } else if (currentByte >= 97 && currentByte <= 102) {
                // 'a' to 'f'
                result += currentByte - 87;
            } else if (currentByte >= 65 && currentByte <= 70) {
                // 'A' to 'F'
                result += currentByte - 55;
            } else {
                revert("Invalid character in address");
            }
        }
        return address(result);
    }

    // Decode the ABI-encoded data and return the decoded array of strings
    function decodeData(
        bytes memory encodedData
    ) internal pure returns (string[] memory) {
        // Decode the data (string, bytes, address, uint16)
        (
            string memory data,
            bytes memory performer,
            address addr,
            uint16 num
        ) = abi.decode(encodedData, (string, bytes, address, uint16));

        // Split the decoded string into an array of strings
        return splitString(data, ",");
    }

    // Split a string into an array of strings using the delimiter
    function splitString(
        string memory str,
        string memory delimiter
    ) internal pure returns (string[] memory) {
        uint256 count = countOccurrences(str, delimiter) + 1;
        string[] memory result = new string[](count);

        uint256 start = 0;
        uint256 index = 0;
        bytes memory strBytes = bytes(str);
        bytes memory delimiterBytes = bytes(delimiter);

        for (uint256 i = 0; i < strBytes.length; i++) {
            bool matchDelimiter = true;

            for (uint256 j = 0; j < delimiterBytes.length; j++) {
                if (
                    i + j >= strBytes.length ||
                    strBytes[i + j] != delimiterBytes[j]
                ) {
                    matchDelimiter = false;
                    break;
                }
            }

            if (matchDelimiter) {
                result[index] = substring(str, start, i);
                index++;
                start = i + delimiterBytes.length;
                i += delimiterBytes.length - 1;
            }
        }

        result[index] = substring(str, start, strBytes.length);
        return result;
    }

    // Count occurrences of a delimiter in the string
    function countOccurrences(
        string memory str,
        string memory sub
    ) internal pure returns (uint256) {
        uint256 count = 0;
        bytes memory strBytes = bytes(str);
        bytes memory subBytes = bytes(sub);

        for (uint256 i = 0; i <= strBytes.length - subBytes.length; i++) {
            bool matchFound = true;
            for (uint256 j = 0; j < subBytes.length; j++) {
                if (strBytes[i + j] != subBytes[j]) {
                    matchFound = false;
                    break;
                }
            }
            if (matchFound) {
                count++;
                i += subBytes.length - 1;
            }
        }
        return count;
    }

    // Extract a substring from the string
    function substring(
        string memory str,
        uint256 start,
        uint256 end
    ) internal pure returns (string memory) {
        bytes memory strBytes = bytes(str);
        bytes memory result = new bytes(end - start);
        for (uint256 i = start; i < end; i++) {
            result[i - start] = strBytes[i];
        }
        return string(result);
    }

    function mintCommon() public {
        require(msg.value >= 0.1, "Not enough token sent; check price!");
        // emit the event here

        // Emit events for tracking
        emit generateCommon(msg.sender);
    }

    function mintEpic() public {
        require(msg.value >= 0.2, "Not enough token sent; check price!");
        // emit the event here

        // Emit events for tracking
        emit generateEpic(msg.sender);
    }

    function mintLegendary() public {
        require(msg.value >= 0.3, "Not enough token sent; check price!");
        // emit the event here

        // Emit events for tracking
        emit generateLegendary(msg.sender);
    }

    // Public function to get all token IDs owned by a user
    function getAllNFTS(address owner) public view returns (uint256[] memory) {
        uint256 balance = balanceOf(owner); // Get the balance (number of tokens owned)
        string[] memory tokenJSON = new string[](balance); // Initialize an array to store token IDs

        // Loop through the tokens owned by the user
        for (uint256 i = 0; i < balance; i++) {
            tokenJSON[i] = tokenURI(tokenOfOwnerByIndex(owner, i)); // Fetch each token ID by index
        }

        return tokenJSON;
    }
}
