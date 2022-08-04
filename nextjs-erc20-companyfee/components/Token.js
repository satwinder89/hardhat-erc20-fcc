import { useWeb3Contract } from "react-moralis";
import { abi, contractAddress } from "../constants/index";
import { useMoralis } from "react-moralis";
import { useEffect } from "react";

export default function Token() {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const tokenAddress =
    chainId in contractAddress ? contractAddress[chainId][0] : null;

  const { runContractFunction: owner } = useWeb3Contract({
    abi: abi,
    contractAddress: tokenAddress,
    functionName: "owner",
    params: {},
  });

  useEffect(() => {
    if (isWeb3Enabled) {
      async function updateUI() {
        const something = await owner();
        console.log("token owener: " + something);
      }
      updateUI()
    }
  }, [isWeb3Enabled]);
  return (<div>Token </div>);
}
