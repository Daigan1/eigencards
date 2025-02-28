// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract ProfilePictureNFT is ERC721URIStorage {
    struct NftProfile {
        bool claimed;
        uint256 tokenId;
    }

    uint256 private _tokenIds;
    address contractOwner;
    mapping(address => NftProfile) info;

    event ProfileClaimed(address indexed user, uint256 tokenId);
    event ProfileUpdated(address indexed user, bool claimed, uint256 tokenId); // Add debugging event

    constructor(address initialOwner) ERC721("MyNFT", "NFT") {
        contractOwner = initialOwner;
    }

    function mintNFT(string memory tokenURI) public returns (uint256) {
        // Check if user has already claimed an NFT
        require(!info[msg.sender].claimed, "Person already owns an NFT");

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

    function getNFT(address user) public view returns (string memory) {
        require(info[user].claimed, "No NFT in profile");
        uint256 tokenId = info[user].tokenId;

        return tokenURI(tokenId);
    }

    function deleteNFT(address user) private {
        require(info[user].claimed, "No NFT to delete");
        uint256 tokenId = info[user].tokenId;

        // Clear the profile info before burning
        info[user].claimed = false;
        info[user].tokenId = 0;

        // Burn the token
        _burn(tokenId);

        emit ProfileUpdated(user, false, 0);
    }

    function ownerDeleteNFT(address recipient) public {
        require(msg.sender == contractOwner, "Not the contract owner");
        deleteNFT(recipient);
    }

    function deleteOwnNFT() public {
        deleteNFT(msg.sender);
    }

    // Soul-bound implementation
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override(ERC721, IERC721) {
        require(
            from == address(0) || to == address(0),
            "SOUL BOUND: NFT cannot be transferred"
        );
        super.transferFrom(from, to, tokenId);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public virtual override(ERC721, IERC721) {
        require(
            from == address(0) || to == address(0),
            "SOUL BOUND: NFT cannot be transferred"
        );
        super.safeTransferFrom(from, to, tokenId, data);
    }
}
