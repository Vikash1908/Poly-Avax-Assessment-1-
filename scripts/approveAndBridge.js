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
