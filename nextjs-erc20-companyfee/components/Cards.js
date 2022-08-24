import { TabList, Tab } from "web3uikit";
import React from "react";
import Token from "./Token";
import Companies from "./Companies";
import Retail from "./Retail";
import Tests from "./Tests";

export default function Cards() {
  return (
    <>
      <div>
        <TabList
          defaultActiveKey={1}
          onChange={function noRefCheck() {}}
          tabStyle="bulbUnion"
        >
          <Tab tabKey={1} tabName="Stablecoin">
            <Token></Token>
          </Tab>
          <Tab tabKey={2} tabName="Sella Companies">
            <Companies></Companies>
          </Tab>
          <Tab tabKey={3} tabName="Retail">
            <Retail></Retail>
          </Tab>
          <Tab tabKey={4} tabName="Tests">
            <Tests></Tests>
          </Tab>
        </TabList>
      </div>
    </>
  );
}
