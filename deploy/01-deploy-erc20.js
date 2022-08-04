const { networkConfig, developmentChain } = require("../helper-hardhat-config");
const { network } = require("hardhat");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const myToken = await deploy("SellaToken", {
    from: deployer,
    args: ["10000000"],
    log: true,
    waitConfirmations: network.config.bloConfirmations || 1,
  });

  //args = [myToken.address];
  const companyFee = await deploy("CompanyFee", {
    from: deployer,
    args: [myToken.address, "10"],
    log: true,
    waitConfirmations: network.config.bloConfirmations || 1,
  });

  if (
    !developmentChain.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(myToken.address, "contracts/SellaToken.sol:SellaToken", ["10000000"])
    await verify(companyFee.address, "contracts/CompanyFee.sol:CompanyFee", [myToken.address, "10"]);
  }
  log("----------------------------------------------------");
};
module.exports.tags = ["all", "companyFee"];
