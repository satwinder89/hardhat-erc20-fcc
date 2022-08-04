// const ethers = require("ethers");
const fs = require("fs");
const { FRONT_END_ADDRESSES_FILE,
  FRONT_END_ABI_FILE } = require("../helper-hardhat-config");

module.exports = async function () {
  if (process.env.UPDATE_FRONT_END) {
    console.log("Updating front end...");
    updateContractAddresses();
    updateAbi();
  }
};

async function updateContractAddresses() {
  const token = await ethers.getContract("SellaToken");
  const companyFee = await ethers.getContract("CompanyFee");
  const chainId = network.config.chainId.toString();
  const currentAddress = JSON.parse(
    fs.readFileSync(FRONT_END_ADDRESSES_FILE, "utf8")
  );
  if (chainId in currentAddress) {
    if (!currentAddress[chainId].includes(token.address)) {
        currentAddress[chainId].push(token.address);
    }
  } {
    currentAddress[chainId] = [token.address];
  }
  fs.writeFileSync(FRONT_END_ADDRESSES_FILE, JSON.stringify(currentAddress));
}

async function updateAbi() {
    const token = await ethers.getContract("SellaToken");
    fs.writeFileSync(FRONT_END_ABI_FILE, token.interface.format(ethers.utils.FormatTypes.json))
}

module.exports.tags = [ "all", "frontend" ]