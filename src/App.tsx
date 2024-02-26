import "./App.css";
import React, { useState } from "react";
import {
  prodParasPolkadot,
  prodParasPolkadotCommon,
  prodRelayPolkadot,
  prodParasKusama,
  prodParasKusamaCommon,
  prodRelayKusama,
  testParasRococo,
  testParasRococoCommon,
  testRelayRococo,
  testParasWestend,
  testParasWestendCommon,
  testRelayWestend,
} from "@polkadot/apps-config";
import { Card, ConfigProvider, Select, Space } from "antd";
import { MIDDLE_STYLE } from "./constants/style";
import ChainSelector from "./components/ChainSelector";

function App() {
  const [selectedRelayChain, setSelectedRelayChain] = useState<
    "polkadot" | "kusama" | "rococo" | "westend"
  >("polkadot");
  const [selectedChainType, setSelectedChainType] = useState<
    "common" | "para" | "relay"
  >("relay");
  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#00b96b" } }}>
      <div className="App" style={{ padding: "20px", ...MIDDLE_STYLE }}>
        <Card title="Select transaction destination">
          <Space direction="vertical">
            <Select
              style={{ width: "100%" }}
              onChange={setSelectedRelayChain}
              value={selectedRelayChain}
              options={[
                {
                  label: "Polkadot",
                  value: "polkadot",
                },
                {
                  label: "Kusama",
                  value: "kusama",
                },
                {
                  label: "Rococo",
                  value: "rococo",
                },
                {
                  label: "Westend",
                  value: "westend",
                },
              ]}
            />
            <Select
              style={{ width: "100%" }}
              onChange={setSelectedChainType}
              value={selectedChainType}
              options={[
                {
                  label: "Common Good Parachain",
                  value: "common",
                },
                {
                  label: "Parachain",
                  value: "para",
                },
                {
                  label: "Relaychain",
                  value: "relay",
                },
              ]}
            />
            {selectedRelayChain === "polkadot" && (
              <React.Fragment>
                {selectedChainType === "para" && (
                  <ChainSelector chainOptions={prodParasPolkadot} />
                )}
                {selectedChainType === "common" && (
                  <ChainSelector chainOptions={prodParasPolkadotCommon} />
                )}
                {selectedChainType === "relay" && (
                  <ChainSelector chainOptions={[prodRelayPolkadot]} />
                )}
              </React.Fragment>
            )}
            {selectedRelayChain === "kusama" && (
              <React.Fragment>
                {selectedChainType === "para" && (
                  <ChainSelector chainOptions={prodParasKusama} />
                )}
                {selectedChainType === "common" && (
                  <ChainSelector chainOptions={prodParasKusamaCommon} />
                )}
                {selectedChainType === "relay" && (
                  <ChainSelector chainOptions={[prodRelayKusama]} />
                )}
              </React.Fragment>
            )}
            {selectedRelayChain === "rococo" && (
              <React.Fragment>
                {selectedChainType === "para" && (
                  <ChainSelector chainOptions={testParasRococo} />
                )}
                {selectedChainType === "common" && (
                  <ChainSelector chainOptions={testParasRococoCommon} />
                )}
                {selectedChainType === "relay" && (
                  <ChainSelector chainOptions={[testRelayRococo]} />
                )}
              </React.Fragment>
            )}
            {selectedRelayChain === "westend" && (
              <React.Fragment>
                {selectedChainType === "para" && (
                  <ChainSelector chainOptions={testParasWestend} />
                )}
                {selectedChainType === "common" && (
                  <ChainSelector chainOptions={testParasWestendCommon} />
                )}
                {selectedChainType === "relay" && (
                  <ChainSelector chainOptions={[testRelayWestend]} />
                )}
              </React.Fragment>
            )}
          </Space>
        </Card>
      </div>
    </ConfigProvider>
  );
}

export default App;
