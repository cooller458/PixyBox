const Token = artifacts.require("Token");
const NFTMarketPlace = artifacts.require("NFTMarketPlace");
const NFT = artifacts.require("NFT");
const box = artifacts.require("box");
const LootBox = artifacts.require("LootBox");

module.exports = async function (deployer) {
  await deployer.deploy(Token);
  const token = await Token.deployed();
  await deployer.deploy(LootBox);

  await deployer.deploy(NFTMarketPlace);
  const market = await NFTMarketPlace.deployed();
  await deployer.deploy(NFT, market.address);
  await deployer.deploy(box);
  const box = await box.deployed();
};
