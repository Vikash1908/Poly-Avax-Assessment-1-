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
