const hre = require('hardhat');

async function main() {
  const NFTMarketplace = await hre.ethers.getContractFactory('contracts/NFTMarketplace.sol:NFTMarketplace');
  const nftMarketplace = await NFTMarketplace.deploy();
  await nftMarketplace.deployed();

  console.log('=================================================================');
  console.log('NFTMarket deployed to:', nftMarketplace.address);
  console.log('=================================================================');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
