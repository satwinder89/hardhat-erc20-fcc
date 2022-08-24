import { useWeb3Contract } from "react-moralis";
import { abi, contractAddress } from "../constants/index";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Input, Button, Widget } from "web3uikit";
import React from "react";

export default function Retail() {
  const { chainId: chainIdHex, isWeb3Enabled, account } = useMoralis();
  const chainId = parseInt(chainIdHex);

  const companyContractAddress = contractAddress["companyFee"][chainId];
  const companyAbi = JSON.parse(abi["companyFee"]);
  const tokenAddress = contractAddress["token"][chainId];
  const tokenAbi = JSON.parse(abi["token"]);

  const [clientBalance, setClientBalance] = useState(0);
  const [buy, setBuy] = useState(0);
  const [pay, setPay] = useState(0);
  const [agent, setAgent] = useState(0);

  const { runContractFunction: balanceOF } = useWeb3Contract({
    abi: tokenAbi,
    contractAddress: tokenAddress,
    functionName: "balanceOf",
    params: { account: account },
  });

  const { runContractFunction: buySellaToken } = useWeb3Contract({
    abi: tokenAbi,
    contractAddress: tokenAddress,
    functionName: "buySellaToken",
    params: { euro: buy }
  });

  const { runContractFunction: payAgent } = useWeb3Contract({
    abi: companyAbi,
    contractAddress: companyContractAddress,
    functionName: "splitPayment",
    params: { agentAddress: agent, amount: pay }
  });

  useEffect(() => {
    async function updateUI() {
    //   let balance = await balanceOF();
    //   console.log(balance);
    //   setClientBalance(balance.toString());

      //   setAddress(user.attributes.ethAddress);
      //   console.log("address: " + address);

      await getClientBalance();
    }
    updateUI();
  }, [isWeb3Enabled, clientBalance, buy]);

  async function getClientBalance(){
    let balance = await balanceOF();
    setClientBalance(balance.toString());
  }

  return (
    <div>
      <div style={{ display: "grid", gap: "20px", padding: "40px 20px" }}>
        <section style={{ display: "flex", gap: "20px" }}>
          <Widget info={clientBalance} title="Balance" />
          <Widget info="Buy" title="Sella Coin">
            <Input
              label="Quantity"
              name="test"
              type="text"
              onChange={(event) => {
                setBuy(event.target.value);
              }}
            />
            <Button
              onClick={async () => {
                await buySellaToken(
                    {
                        onSuccess: (tx) => tx.wait(1).then(async () => {
                            console.log("all is ok")
                            await getClientBalance();
                        }),
                    }
                )
              }}
              text="Agent"
              theme="primary"
            />
          </Widget>
        </section>
        <section style={{ display: "flex", gap: "20px" }}>
        <Widget info="Pay" title="Agent">
            <Input
              label="Agent Address"
              name="test"
              type="text"
              onChange={(event) => {
                setAgent(event.target.value);
              }}
            />
            <Input
              label="Quantity Sella Token"
              name="test"
              type="text"
              onChange={(event) => {
                setPay(event.target.value);
              }}
            />
            <Button
              onClick={async () => {
                await payAgent(
                    {
                        onSuccess: (tx) => tx.wait(1).then(async () => {
                            console.log("all is ok")
                            await getClientBalance();
                        }),
                    }
                )
              }}
              text="Agent"
              theme="primary"
            />
          </Widget>
        </section>
      </div>
    </div>
  );
}
