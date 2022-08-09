import {
  Button,
  TabList,
  Tab,
  SvgMessageCircle,
  SvgBell,
  SvgPlus,
} from "web3uikit";
import React from "react";
import Token from "./Token";

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
            <div>This is Card 2</div>
          </Tab>
          <Tab tabKey={3} tabName="Card 3">
            <div>This is Card 3</div>
          </Tab>
        </TabList>
      </div>
    </>
  );
}
