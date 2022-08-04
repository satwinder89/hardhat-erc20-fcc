const networkConfig = {
    4: {
        name: "rinkeby",
        ethUsdPriceFeed: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e"
    },
    137: {
        name: "polygon",
        ethUsdPriceFeed: "0xF9680D99D6C9589e2a93a78A04A279e509205945"
    },
    31337: {
        name: "localhost",
        subscriptionId: "588",
        gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // 30 gwei
        keepersUpdateInterval: "30",
        callbackGasLimit: "500000", // 500,000 gas
    },
    
}

const developmentChain = ["hardhat", "localhost"];
const DECIMALS = 8;
const INITIAL_ANSWER = 200000000000;
const FRONT_END_ADDRESSES_FILE=
  "./nextjs-erc20-companyfee/constants/contractAddresses.json";
const FRONT_END_ABI_FILE = "./nextjs-erc20-companyfee/constants/abi.json";

module.exports = {
    networkConfig,
    developmentChain,
    DECIMALS,
    INITIAL_ANSWER,
    FRONT_END_ADDRESSES_FILE,
    FRONT_END_ABI_FILE
}