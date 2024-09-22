import React, { useEffect } from "react";
import { EndpointOption } from "@polkadot/apps-config/endpoints/types";
import { Select, Space } from "antd";
import { MIDDLE_STYLE } from "../constants/style";
import ChainInfoCard from "./ChainInfoCard";
import { useAssetTransferStore } from "../stores/useAssetTransferStore";

type Props = {
  chainOptions: EndpointOption[];
};

const ChainSelector = ({ chainOptions }: Props) => {
  const { selectedEndpointOption, setSelectedEndpointOption } =
    useAssetTransferStore();
  const defaultParaValue = chainOptions[0]?.paraId;

  useEffect(() => {
    if (chainOptions.length > 0) {
      setSelectedEndpointOption(
        chainOptions.find((para) => para.paraId === defaultParaValue)
      );
    }
  }, [chainOptions]);

  return (
    <div>
      {chainOptions.length > 1 && (
        <Select
          style={{ width: "100%" }}
          onChange={(value) =>
            setSelectedEndpointOption(
              chainOptions.find((para) => para.paraId === value)
            )
          }
          value={selectedEndpointOption?.paraId || defaultParaValue}
          options={chainOptions.map((chain) => ({
            key: chain.paraId,
            label: (
              <Space
                style={{
                  ...MIDDLE_STYLE,
                  margin: 0,
                  justifyContent: "flex-start",
                }}
              >
                {chain.ui.logo && (
                  <img
                    style={{
                      width: 15,
                      aspectRatio: "1/1",
                      borderRadius: "50%",
                    }}
                    src={chain.ui.logo}
                  />
                )}
                <h3 style={{ margin: 0, fontWeight: "normal" }}>
                  {chain.text}
                </h3>
              </Space>
            ),
            value: chain.paraId,
          }))}
        />
      )}
      {selectedEndpointOption ? (
        <ChainInfoCard endpoint={selectedEndpointOption} />
      ) : (
        <div>No chain selected</div>
      )}
    </div>
  );
};

export default ChainSelector;
