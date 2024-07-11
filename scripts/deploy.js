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
