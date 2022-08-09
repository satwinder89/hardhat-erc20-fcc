import { useWeb3Contract } from "react-moralis";
import { abi, contractAddress } from "../constants/index";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Input, Button, Widget } from "web3uikit";
import React from "react";

export default function Companies() {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
    const chainId = parseInt(chainIdHex);
    const tokenAddress = contractAddress["companyFee"][chainId];
    const tokenAbi = JSON.parse(abi["companyFee"]);
    return (<div>

    </div>)
}