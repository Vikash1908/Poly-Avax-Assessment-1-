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
