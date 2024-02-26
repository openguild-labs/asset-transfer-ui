import "./App.css";
import React, { useMemo, useState } from "react";
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
import { Button, Card, ConfigProvider, Select, Space, Tag } from "antd";
import { MIDDLE_STYLE } from "./constants/style";
import ChainSelector from "./components/ChainSelector";
import { useAssetTransferStore } from "./stores/useAssetTransferStore";
import AssetRegistry from "@substrate/asset-transfer-api-registry";

function App() {
  const {
    selectedRelayChain,
    setSelectedRelayChain,
    selectedChainType,
    setSelectedChainType,
    selectedEndpointOption,
    selectedAssetsIds,
    setSelectedAssetIds,
  } = useAssetTransferStore();
  const [selectedAssetId, setSelectedAssetId] = useState<string | undefined>(
    undefined
  );

  const handleAddAsset = () => {
    if (selectedAssetId && selectedAssetsIds.includes(selectedAssetId)) return;
    setSelectedAssetIds([...selectedAssetsIds, selectedAssetId]);
  };

  const handleRemoveAsset = (assetId: string) => {
    setSelectedAssetIds(selectedAssetsIds.filter((id) => id !== assetId));
  };

  const selectedAssetRegistry = useMemo<
    | {
        tokens: string[];
        // Asset ID - Asset name
        assetsInfo: Record<string, string>;
        foreignAssetsInfo: Record<
          string,
          {
            symbol: string;
            name: string;
            multiLocation: string;
          }
        >;
        poolPairsInfo: any;
        specName: string;
        xcAssetsData?: {
          paraID: number;
          nativeChainID: string;
          symbol: string;
          decimals: number;
          xcmV1MultiLocation: string;
          asset: any;
        }[];
      }
    | undefined
  >(() => {
    if (selectedEndpointOption?.paraId) {
      return (AssetRegistry[selectedRelayChain] as any)[
        selectedEndpointOption?.paraId
      ];
    }
    return undefined;
  }, [selectedRelayChain, selectedEndpointOption, AssetRegistry]);

  const transformedAssetInfos = useMemo(() => {
    if (!selectedAssetRegistry) return [];
    return Object.keys(selectedAssetRegistry.assetsInfo).map((asset) => ({
      label: (
        <div style={{ ...MIDDLE_STYLE, justifyContent: "space-between" }}>
          <div>{(selectedAssetRegistry.assetsInfo as any)[asset]}</div>
          <Tag color="blue">{`ID: ${asset}`}</Tag>
        </div>
      ),
      value: asset,
    }));
  }, [selectedAssetRegistry]);

  useMemo(() => {
    setSelectedAssetId(transformedAssetInfos[0]?.value);
  }, [transformedAssetInfos]);

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#00b96b" } }}>
      <div className="App" style={{ padding: "20px", display: "flex" }}>
        <Card
          style={{ margin: "0px 10px", minWidth: 400 }}
          title="Select transaction destination"
        >
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
        <Card
          style={{ margin: "0px 10px", minWidth: 400 }}
          title="Select parachain asset"
        >
          {transformedAssetInfos.length > 0 && (
            <React.Fragment>
              <Select
                value={selectedAssetId}
                onChange={setSelectedAssetId}
                style={{ width: "100%" }}
                options={transformedAssetInfos}
              />
              <Button
                style={{ width: "100%", margin: "10px 0px" }}
                type="primary"
                onClick={handleAddAsset}
              >
                Add asset
              </Button>
            </React.Fragment>
          )}
          <div>
            <Space>
              {selectedAssetsIds.map((assetId) => (
                <Tag
                  closable
                  onClose={() => handleRemoveAsset(assetId)}
                  color="blue"
                >
                  {selectedAssetRegistry?.assetsInfo[assetId]}
                </Tag>
              ))}
            </Space>
          </div>
        </Card>
      </div>
    </ConfigProvider>
  );
}

export default App;
