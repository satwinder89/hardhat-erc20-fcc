import { useWeb3Contract } from "react-moralis";
import { abi, contractAddress } from "../constants/index";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Form, Modal, Input, Button } from "web3uikit";

export default function TokenEntrance() {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const tokenAddress = contractAddress["token"][chainId];
  const tokenAbi = JSON.parse(abi["token"]);
  const [contractOwner, setContractOwner] = useState("0");
  const [addressBalanceOf, setAddressBalanceOf] = useState(0);
  const [getBalanceOf, setBalanceOf] = useState(0);

  const { runContractFunction: owner } = useWeb3Contract({
    abi: tokenAbi,
    contractAddress: tokenAddress,
    functionName: "owner",
    params: {},
  });

  const { runContractFunction: balanceOf } = useWeb3Contract({
    abi: tokenAbi,
    contractAddress: tokenAddress,
    functionName: "balanceOf",
    params: {account: addressBalanceOf},
  })

  const { runContractFunction: totalSupply } = useWeb3Contract({
    abi: tokenAbi,
    contractAddress: tokenAddress,
    functionName: "totalSupply",
    params: {},
  })

  useEffect(() => {
    if (isWeb3Enabled) {
      async function updateUI() {
      }
      updateUI();
    }
  }, [isWeb3Enabled]);

  return (
    <div>
      Token Owner: {contractOwner}
      <Button
        onClick={async () => {
          const contractOwnerToken = await owner();
          setContractOwner(contractOwnerToken);
          console.log(contractOwnerToken)
        }}
        text="Contract Owner"
        theme="primary"
      />
      <Input
        label="Balance Of Address"
        name="BalanceOf"
        type="text"
        onChange={(event) => {
          setAddressBalanceOf(event.target.value);
        }}
      />
      <Button
        onClick={async () => {
          let balance = await balanceOf();
          let totalSupplya = await totalSupply();
          setBalanceOf(balance);
          console.log(balance)
          console.log(addressBalanceOf)
          console.log("TOT: " + totalSupplya)
        }}
        text="Contract Owner"
        theme="primary"
      />
    </div>
  );
}
