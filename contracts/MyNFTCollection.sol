// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFTCollection is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;
    string public descriptionPrompt;

    constructor(string memory _prompt) ERC721("MyNFTCollection", "MNFT") {
        tokenCounter = 0;
        descriptionPrompt = _prompt;
    }

    function mintNFT(address recipient, string memory tokenURI) public onlyOwner {
        uint256 newTokenId = tokenCounter;
        _safeMint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        tokenCounter += 1;
    }

    function getPromptDescription() public view returns (string memory) {
        return descriptionPrompt;
    }
}
