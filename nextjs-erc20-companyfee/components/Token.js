import { useWeb3Contract } from "react-moralis";
import { abi, contractAddress } from "../constants/index";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Input, Button, Widget } from "web3uikit";
import React from "react";

export default function Token() {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const tokenAddress = contractAddress["token"][chainId];
  const tokenAbi = JSON.parse(abi["token"]);
  const [contractOwner, setContractOwner] = useState(0);
  const [addressBalanceOf, setAddressBalanceOf] = useState(0);
  const [getOwnerBalance, setOwnerBalance] = useState(0);
  const [getBalanceOf, setBalanceOf] = useState(0);
  const [getTotalSupply, setTotalSupply] = useState(0);

  const [getTotIncreaseSupply, setTotIncreaseSupply] = useState(0);
  const [getTotDecreaseSupply, setTotDescreaseSupply] = useState(0);
  const [getNewOwner, setNewOwner] = useState("");

  const { runContractFunction: transferOwnership } = useWeb3Contract({
    abi: tokenAbi,
    contractAddress: tokenAddress,
    functionName: "owner",
    params: {newOwner: getNewOwner },
  });

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
    params: { account: addressBalanceOf },
  });

  const { runContractFunction: balanceOfOwner } = useWeb3Contract({
    abi: tokenAbi,
    contractAddress: tokenAddress,
    functionName: "balanceOf",
    params: { account: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" },
  });

  const { runContractFunction: totalSupply } = useWeb3Contract({
    abi: tokenAbi,
    contractAddress: tokenAddress,
    functionName: "totalSupply",
    params: {},
  });

  const { runContractFunction: increaseSupply } = useWeb3Contract({
    abi: tokenAbi,
    contractAddress: tokenAddress,
    functionName: "buySellaToken",
    params: { euro: getTotIncreaseSupply },
  });

  const { runContractFunction: decreaseSupply } = useWeb3Contract({
    abi: tokenAbi,
    contractAddress: tokenAddress,
    functionName: "sellSellaToken",
    params: { value: getTotDecreaseSupply },
  });

  useEffect(() => {
    if (isWeb3Enabled) {
      async function updateUI() {
        const supply = await totalSupply();
        const amount = ethers.utils.parseUnits(supply.toString(), 0);
        const contractOwnerToken = await owner();
        const ownerBalance = await balanceOfOwner();
        setContractOwner(contractOwnerToken);
        setTotalSupply(amount.toString());
        setOwnerBalance(ownerBalance.toString());
        console.log("TOTAL SUPPLY " + getTotalSupply);
      }
      updateUI();
    }
  }, [isWeb3Enabled, getTotalSupply, getNewOwner]);

  return (
    <div>
      <div style={{ display: "grid", gap: "20px", padding: "40px 20px" }}>
        <section style={{ display: "flex", gap: "20px" }}>
          <Widget info="SELLA" title="Sella Token" />
          <Widget info={getTotalSupply.toString()} title="Total Supply">
            <div>CHART COMING SOON</div>
          </Widget>
        </section>
        <section style={{ display: "flex", gap: "20px" }}>
          <Widget info={contractOwner} title="Token Owner" />
          <Widget info={getOwnerBalance} title="Owner Balance" />
          <Widget info={getTotalSupply.toString()} title="Euro Pag" />
          <Widget info="Ethereum" title="NETWORK" />
        </section>
      </div>
      <div style={{ display: "grid", gap: "20px", padding: "40px 20px" }}>
        <section style={{ display: "flex", gap: "20px" }}>
          <Widget>
            <Input
              label="Increase total supply"
              name="IncreaseTotSupply"
              type="text"
              onChange={(event) => {
                setTotIncreaseSupply(event.target.value);
              }}
            />
            <Button
              onClick={async () => {
                console.log("da aumentare: " + getTotIncreaseSupply);
                await increaseSupply();
              }}
              text="Increase"
              theme="primary"
            />
          </Widget>
          <Widget>
            <Input
              label="Decrease total supply"
              name="DecreaseTotSupply"
              type="text"
              onChange={(event) => {
                setTotDescreaseSupply(event.target.value);
              }}
            />
            <Button
              onClick={async () => {
                console.log("da aumentare: " + getTotDecreaseSupply);
                await decreaseSupply();
              }}
              text="Decrease"
              theme="primary"
            />
          </Widget>
          <Widget>
            <Input
              label="Decrease total supply"
              name="DecreaseTotSupply"
              type="text"
              onChange={(event) => {
                setNewOwner(event.target.value);
              }}
            />
            <Button
              onClick={async () => {
                console.log("da aumentare: " + getTotDecreaseSupply);
                await transferOwnership();
              }}
              text="Decrease"
              theme="primary"
            />
          </Widget>
        </section>
        <section style={{ display: "flex", gap: "20px" }}>
          <Widget info={getBalanceOf.toString()}>
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
                setBalanceOf(balance);
              }}
              text="Balance"
              theme="primary"
            />
          </Widget>
        </section>
      </div>
    </div>
  );
}
