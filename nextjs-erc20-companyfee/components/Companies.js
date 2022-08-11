import { useWeb3Contract } from "react-moralis";
import { abi, contractAddress } from "../constants/index";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Input, Button, Widget, Information } from "web3uikit";
import React from "react";

export default function Companies() {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const companyContractAddress = contractAddress["companyFee"][chainId];
  const companyAbi = JSON.parse(abi["companyFee"]);

  const [companyAddAddress, setCompanyAddAddress] = useState(0);
  const [companyAddName, setCompanyAddName] = useState(0);
  const [companyAddFee, setCompanyAddFee] = useState(0);
  const [agentAddAddress, setAgentAddAddress] = useState(0);
  const [agentAddName, setAgentAddName] = useState(0);
  const [agentAddFee, setAgentAddFee] = useState(0);
  const [agentAddress1, setAgentAddress] = useState(0);
  const [companyAddress1, setCompanyAddress] = useState(0);
  const [company, setCompany] = useState(0);
  const [companyName, setCompanyName] = useState(0);
  const [companyFee, setCompanyFee] = useState(0);
  const [agent, setAgent] = useState(0);
  const [agentName, setAgentName] = useState(0);
  const [agentFee, setAgentFee] = useState(0);

  const { runContractFunction: addNewCompany } = useWeb3Contract({
    abi: companyAbi,
    contractAddress: companyContractAddress,
    functionName: "addCompany",
    params: {
      companyAddress: companyAddAddress,
      companyName: companyAddName,
      companyFee: companyAddFee,
    },
  });

  const { runContractFunction: addNewAgent } = useWeb3Contract({
    abi: companyAbi,
    contractAddress: companyContractAddress,
    functionName: "addAgent",
    params: {
      agentAddress: agentAddAddress,
      agentName: agentAddName,
      agentFee: agentAddFee,
    },
  });

  const { runContractFunction: getAgentFee } = useWeb3Contract({
    abi: companyAbi,
    contractAddress: companyContractAddress,
    functionName: "getAgentFee",
    params: {
      agentAddress: agentAddress1
    }
  })

  const { runContractFunction: getCompanyFee } = useWeb3Contract({
    abi: companyAbi,
    contractAddress: companyContractAddress,
    functionName: "getCompanyFee",
    params: { companyAddress: companyAddress1}
  })

  const { runContractFunction: getContractAddress } = useWeb3Contract({
    abi: companyAbi,
    contractAddress: companyContractAddress,
    functionName: "getContractAddress",
    params: {}
  })

  const { runContractFunction: getOwnerFee } = useWeb3Contract({
    abi: companyAbi,
    contractAddress: companyContractAddress,
    functionName: "ownerFee",
    params: {}
  })

  const { runContractFunction: getCompany } = useWeb3Contract({
    abi: companyAbi,
    contractAddress: companyContractAddress,
    functionName: "company",
    params: {
      companyAddress: companyAddress1
    }
  })

  const { runContractFunction: getAgent } = useWeb3Contract({
    abi: companyAbi,
    contractAddress: companyContractAddress,
    functionName: "agent",
    params: {
      agentAddress: agentAddress1
    }
  })

  const { runContractFunction: getTokenAddress } = useWeb3Contract({
    abi: companyAbi,
    contractAddress: companyContractAddress,
    functionName: "getTokenAddress",
    params: {}
  })


  useEffect(() => {
    if (isWeb3Enabled) {
      async function updateUI() {
        try {
          // setCompanyAddress("0x70997970C51812dc3A010C7d01b50e0d17dc79C8")
          // let test = await getCompany();
          // console.log("company: " + test);
        } catch (e) {
          console.log(e);
        }
      }
      updateUI();
    }
  }, [isWeb3Enabled]);

  return (
    <div>
      <div style={{ display: "grid", gap: "20px", padding: "40px 20px" }}>
        <section style={{ display: "flex", gap: "20px" }}>
          <Widget info="Company" title="New Company">
            <Input
              label="Address"
              name="companyAddress"
              type="text"
              onChange={(event) => {
                setCompanyAddAddress(event.target.value);
              }}
            />
            <Input
              label="Name"
              name="companyName"
              type="text"
              onChange={(event) => {
                setCompanyAddName(event.target.value);
              }}
            />
            <Input
              label="Fee"
              name="companyFee"
              type="text"
              onChange={(event) => {
                setCompanyAddFee(event.target.value);
              }}
            />
            <Button
              onClick={async () => {
                console.log("Name: " + companyAddName);
                console.log("Fee: " + companyAddFee);
                console.log("Address: " + companyAddAddress);
                await addNewCompany();
              }}
              text="New Company"
              theme="primary"
            />
          </Widget>
        </section>
        <section style={{ display: "flex", gap: "20px" }}>
          <Widget info="Agent" title="New Agent">
            <Input
              label="Address"
              name="agentAddress"
              type="text"
              onChange={(event) => {
                setAgentAddAddress(event.target.value);
              }}
            />
            <Input
              label="Name"
              name="agentName"
              type="text"
              onChange={(event) => {
                setAgentAddName(event.target.value);
              }}
            />
            <Input
              label="Fee"
              name="agentFee"
              type="text"
              onChange={(event) => {
                setAgentAddFee(event.target.value);
              }}
            />
            <Button
              onClick={async () => {
                console.log("Name: " + agentAddName);
                console.log("Fee: " + agentAddFee);
                console.log("Address: " + agentAddAddress);
                await addNewAgent();
              }}
              text="New Agent"
              theme="primary"
            />
          </Widget>
        </section>
        <section style={{ display: "flex", gap: "20px" }}>
          <Widget info="Company" title="Company">
            <Input
              label="Address"
              name="test"
              type="text"
              onChange={(event) => {
                setCompanyAddress(event.target.value);
              }}
            />
            <Button
              onClick={async () => {
                let company = await getCompany();
                setCompany(company)
                setCompanyName(company.name);
                let cmpFee = company.fee;
                
                setCompanyFee(cmpFee.toString());
              }}
              text="New Agent"
              theme="primary"
            />
            Name: {companyName} <br/> 
            Fee: {companyFee}
          </Widget>
          <Widget info="Agent" title="Agent">
            <Input
              label="Address"
              name="test"
              type="text"
              onChange={(event) => {
                setAgentAddress(event.target.value);
              }}
            />
            <Button
              onClick={async () => {
                let agent = await getAgent();
                setAgent(agent)
                setAgentName(agent.name);
                let agtFee = agent.fee;
                
                setAgentFee(agtFee.toString());
              }}
              text="Agent"
              theme="primary"
            />
            Name: {agentName} <br/> 
            Fee: {agentFee}
          </Widget>
          </section>
      </div>
    </div>
  );
}
