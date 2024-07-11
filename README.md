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

### Deploying the Smart Contract

1. Modify the promptDescription in the deploy.js script with your desired prompt description for the NFTs generated.

2. Deploy the contract to the sepolia network:
   - npx hardhat run scripts/deploy.js --network sepolia

### Minting the NFTs

1. Once deployed, mint NFTs by running:
   - npx hardhat run scripts/batchMint.js --network sepolia

### Bridging NFTs to Polygon

1. Prepare your contracts and addresses in bridge.js for bridging NFTs to Polygon.

2. Run the bridging script:
   - npx hardhat run scripts/approveAndBridge.js --network sepolia

### Checking NFT Balance

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