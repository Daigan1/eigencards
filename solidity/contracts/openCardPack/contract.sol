// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract OpenCardPack is ERC721URIStorage, ERC721Enumerable {


    uint256 private _tokenIds;
    address contractOwner;



    constructor(address initialOwner) ERC721("MyNFT", "NFT") {
        contractOwner = initialOwner;
    }


	   function mintCommonNFTPack(string[] memory cardIds) public returns (uint256) {
    
 		require(msg.value >= 0.1, "Not enough token sent; check price!");

        // Increment the token counter
        _tokenIds++;
        uint256 newItemId = _tokenIds;

        // Mint the token and set its URI
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        // Update the user's profile info
        info[msg.sender] = NftProfile({claimed: true, tokenId: newItemId});

        // Emit events for tracking
        emit ProfileClaimed(msg.sender, newItemId);
        emit ProfileUpdated(
            msg.sender,
            info[msg.sender].claimed,
            info[msg.sender].tokenId
        );

        return newItemId;
    }

   
}
