// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract ProfilePictureNFT is ERC721URIStorage {

    struct NftProfile {
        bool claimed;
        uint256 tokenId;
    }

    uint256 private _tokenIds;
    address contractOwner;
    mapping (address => NftProfile) info;

    constructor(address initialOwner) ERC721("MyNFT", "NFT") {contractOwner = initialOwner;}

    function mintNFT(string memory tokenURI)
        public
        returns (uint256)
    {
        NftProfile storage profile = info[msg.sender];
        _tokenIds++;

        uint256 newItemId = _tokenIds;
          if (!profile.claimed) {
            profile.claimed = true;
            profile.tokenId = newItemId;
        }
        else {
            revert("Person already owns an NFT");
        }

        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function getProfileNFT() public view returns(string memory) {
        NftProfile storage profile = info[msg.sender];
        require(profile.claimed, "No nft in profile");
        return tokenURI(profile.tokenId);
    }

    function deleteNFT(address recipient) private {
        NftProfile storage profile = info[recipient];
        _burn(profile.tokenId);
        profile.claimed = false;
        profile.tokenId = 0;
    }

    function ownerDeleteNFT(address recipient) public {
        require(msg.sender == contractOwner);
        deleteNFT(recipient);
    }

    function deleteOwnNFT() public  {
        deleteNFT(msg.sender);
    }
}