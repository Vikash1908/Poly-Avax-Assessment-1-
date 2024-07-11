# ERC721 Ethereum Sepolia to Polygon Amoy Bridge Using fxPortal
This project demonstrates how to use the fxPortal contracts to transfer ERC721 tokens from Ethereum Sepolia to Polygon Amoy.

## Description
This repository contains a Solidity smart contract for creating an NFT collection on the Ethereum blockchain. The contract allows for minting unique NFTs with associated metadata URIs.

## Getting Started

To deploy and interact with the contract, follow these steps:

### Prerequisites
1. Node.js and npm installed
2. Hardhat installed
3. @pinata/sdk installed (npm install --save @pinata/sdk)

#### Installing
1. Clone this repository
2. Install dependencies:
   - npm i

## Smart Contact
The smart contract `MyNFTCollection.sol` provides functionalities to mintNFT and getPromptDescription.
<div>
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

</div>

### Deploying the Smart Contract
<div>
   const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const promptDescription = "Generated with DALL-E 2 with a prompt describing the images.";

  const NFTContractFactory = await hre.ethers.getContractFactory("MyNFTCollection");
  const nftContract = await NFTContractFactory.deploy(promptDescription);
  await nftContract.waitForDeployment();

  console.log("NFT Collection deployed to:", nftContract.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
</div>


1. Modify the promptDescription in the deploy.js script with your desired prompt description for the NFTs generated.

2. Deploy the contract to the sepolia network:
   - npx hardhat run scripts/deploy.js --network sepolia

### Minting the NFTs
<div>
   const hre = require("hardhat");
const pinataSDK = require('@pinata/sdk');

const apiKey = '233a041eea78ebd1c194';
const secretApiKey = '5e3b756240fa51f9035cb042d439e6b6c48cb13044d85f50d78c567b67369dc9';
const pinata =  new pinataSDK(apiKey, secretApiKey);

const nftContractAddress = "0x19972D6F1e8a8A853430e62081D00D71caA09234";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const nftContract = await hre.ethers.getContractAt("MyNFTCollection", nftContractAddress);

  const tokenURIs = [
      "ipfs://QmX5Kpex82asQ9GQn5WwJjTLgPLJfFWkKj7u1YQ69Xucfd",
      "ipfs://QmS9wf8kxQNbxw1o2p6br225Zmvy78bAcxBW7wSb3WpAyc",
      "ipfs://QmS9wf8kxQNbxw1o2p6br225Zmvy78bAcxBW7wSb3WpAyc",
      "ipfs://QmdCbZwUYEES94qMx5TqEc7CmmsoL2jSCf7cGp31SYdfUR",
      "ipfs://QmZ6cr1cBDwi78qrXrxACxukZvDTNnxAxcLU5qLVYu8mzx",
  ];

  for (const tokenURI of tokenURIs) {
    const tx = await nftContract.mintNFT(deployer.address, tokenURI);
    await tx.wait();
    console.log(`Minted NFT with tokenURI: ${tokenURI}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
</div>


1. Once deployed, mint NFTs by running:
   - npx hardhat run scripts/batchMint.js --network sepolia

### Bridging NFTs to Polygon
<div>
   const hre = require("hardhat");
const fxRootContractABI = require("../fxRootContractABI.json");

const nftContractAddress = "0x19972D6F1e8a8A853430e62081D00D71caA09234";
const fxERC721RootAddress = "0x9E688939Cb5d484e401933D850207D6750852053";
const walletAddress = "0xA9c10C4764d291482893c89456b1c2c9FEB52D10";

async function main() {
  const nftContract = await hre.ethers.getContractAt("MyNFTCollection", nftContractAddress);
  const fxContract = await hre.ethers.getContractAt(fxRootContractABI, fxERC721RootAddress);

  // Approve all NFTs for transfer
  const approveTx = await nftContract.setApprovalForAll(fxERC721RootAddress, true);
  await approveTx.wait();
  console.log("Approval confirmed");

  // Bridge each NFT to Polygon Amoy testnet
  const tokenIds = [0, 1, 2, 3, 4];
  for (const tokenId of tokenIds) {
    const depositTx = await fxContract.deposit(nftContractAddress, walletAddress, tokenId, "0x");
    await depositTx.wait();
    console.log(`Token ${tokenId} deposited`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
</div>


1. Prepare your contracts and addresses in bridge.js for bridging NFTs to Polygon.
2. Run the bridging script:
   - npx hardhat run scripts/approveAndBridge.js --network sepolia

### Checking NFT Balance
<div>
   const hre = require("hardhat");

const nftContractAddress = "0x4bb5ca6715b27bc9b5aba7540bc0a876ec8936d9"; 
const walletAddress = "0xA9c10C4764d291482893c89456b1c2c9FEB52D10";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const nftContract = await hre.ethers.getContractAt("MyNFTCollection", nftContractAddress);

  const balance = await nftContract.balanceOf(walletAddress);
  console.log(`Balance of NFTs for address ${walletAddress}: ${balance.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
</div>


1. Wait 20-30ish minutes for tokens to show on polygon account
2. Run npm i to install dependencies
3. Use polyscan.com to check your account for the tokens. Once they arrive, you can click on the transaction to get the contract address for polygon.
4. Paste the newly deployed contract address in the nftContractAddress variable in approveAndBridge.js script.
5. Run npx hardhat run scripts/approveAndBridge.js --network amoy to see the new polygon balance

6. Run npx hardhat run scripts/mint.js --network goerli to mint tokens to your wallet
7. Run npx hardhat run scripts/approveDeposit.js --network goerli to approve and deposit your tokens to polygon
8. Wait 20-30ish minutes for tokens to show on polygon account
9. Use polyscan.com to check your account for the tokens. Once they arrive, you can click on the transaction to get the contract address for polygon.
10. Use this polygon contract address for your getBalance script's tokenAddress.
11. Run npx hardhat run scripts/getBalance.js --network mumbai to see the new polygon balance.

## Authors

Vikash Kumar Singh

## License

This project is licensed under Vikash Kumar Singh.
