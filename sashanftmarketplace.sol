// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract sashanftmarketplace is ERC721 {
    mapping(address => uint8) public ownedNFTs;
    mapping(address => bool) public blockedWallets;

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}

    function mint(address _to, uint256 _tokenId) public {
        require(ownedNFTs[_to] < 2, "Wallet already has maximum NFTs");
        require(!blockedWallets[_to], "Wallet is blocked");

        _mint(_to, _tokenId);
        ownedNFTs[_to]++;
    }

    function blockWallet(address _wallet) public {
        blockedWallets[_wallet] = true;
    }

    function unblockWallet(address _wallet) public {
        blockedWallets[_wallet] = false;
    }
}
