const { networkConfig, developmentChain } = require("../helper-hardhat-config");
const { network } = require("hardhat");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const arguments = [
    "10"
  ]
  const myToken = await deploy("CompanyFee", {
    from: deployer,
    args: arguments,
    log: true,
    waitConfirmations: network.config.bloConfirmations || 1,
  });
  if (
    !developmentChain.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(myToken.address, "contracts/CompanyFee.sol:CompanyFee", arguments);
  }
  log("----------------------------------------------------");
};
module.exports.tags = ["all", "mytoken"];
