const { networkConfig, developmentChain } = require("../helper-hardhat-config");
const { network } = require("hardhat");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const initialSupply = "72883040000000000000000";
  const setToken = await deploy("SetToken", {
    from: deployer,
    args: [initialSupply],
    log: true,
    waitConfirmations: network.config.bloConfirmations || 1,
  });
  if (
    !developmentChain.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(setToken.address, "contracts/SetToken.sol:SetToken", [initialSupply]);
  }
  log("----------------------------------------------------");
};
module.exports.tags = ["all", "settoken"];
