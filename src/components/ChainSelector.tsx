import React, { useEffect, useState } from "react";
import { EndpointOption } from "@polkadot/apps-config/endpoints/types";
import { Select, Space } from "antd";
import { MIDDLE_STYLE } from "../constants/style";
import ChainInfoCard from "./ChainInfoCard";

type Props = {
  chainOptions: EndpointOption[];
};

const ChainSelector = ({ chainOptions }: Props) => {
  const [selectedPara, setSelectedPara] = useState<EndpointOption | undefined>(
    undefined
  );
  const defaultParaValue = chainOptions[0].paraId;

  useEffect(() => {
    setSelectedPara(
      chainOptions.find((para) => para.paraId === defaultParaValue)
    );
  }, [defaultParaValue, chainOptions]);

  return (
    <div>
      {chainOptions.length > 1 && (
        <Select
          style={{ width: "100%" }}
          onChange={(value) =>
            setSelectedPara(chainOptions.find((para) => para.paraId === value))
          }
          value={selectedPara?.paraId || defaultParaValue}
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
      {selectedPara ? (
        <ChainInfoCard endpoint={selectedPara} />
      ) : (
        <div>No chain selected</div>
      )}
    </div>
  );
};

export default ChainSelector;
