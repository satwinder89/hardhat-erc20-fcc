// const ethers = require("ethers");
const fs = require("fs");
const {
  FRONT_END_ADDRESSES_FILE,
  FRONT_END_ABI_FILE,
} = require("../helper-hardhat-config");

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
  const currentAddress = {
    "token": {
      [chainId]: token.address
    },
    "companyFee": {
      [chainId]: companyFee.address
    }

  }

  // let frontEndAddress = fs.readFileSync(FRONT_END_ADDRESSES_FILE, "utf8");
  // let currentAddress;
  // if (frontEndAddress) {
  //   currentAddress = JSON.parse(frontEndAddress);
  // }
  // if (currentAddress) {
  //   if (chainId in currentAddress) {
  //     if (!currentAddress[chainId].includes(token.address)) {
  //       currentAddress[chainId].push(token.address);
  //     }
  //   }
  // }
  // {
  //   currentAddress = {};
  //   // currentAddress[chainId] = [token.address];
  //   currentAddress["token"][chainId] = [token.address];
  //   currentAddress["companyFee"][chainId] = [companyFee.address];
  // }
  fs.writeFileSync(FRONT_END_ADDRESSES_FILE, JSON.stringify(currentAddress));
}

async function updateAbi() {
  let token = await ethers.getContract("SellaToken");
  let companyFee = await ethers.getContract("CompanyFee");
  token = token.interface.format(ethers.utils.FormatTypes.json);
  companyFee = companyFee.interface.format(ethers.utils.FormatTypes.json);
  let abis = {
    token: token,
    companyFee: companyFee,
  };
  console.log(JSON.stringify(abis));
  fs.writeFileSync(FRONT_END_ABI_FILE, JSON.stringify(abis));
}

module.exports.tags = ["all", "frontend"];
