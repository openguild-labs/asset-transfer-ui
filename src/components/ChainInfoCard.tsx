import React, { useEffect, useMemo, useState } from "react";
import { EndpointOption } from "@polkadot/apps-config/endpoints/types";
import { Radio, Space } from "antd";

type Props = {
  endpoint: EndpointOption;
};

const ChainInfoCard = ({ endpoint }: Props) => {
  const [selectedEndpointProvider, setSelectedEndpointProvider] = useState<
    string | undefined
  >(undefined);

  const transformedEndpointProviders = useMemo(() => {
    return Object.keys(endpoint.providers).map((provider) => ({
      name: provider,
      value: (endpoint.providers as any)[provider],
    }));
  }, [endpoint.providers]);

  useEffect(() => {
    if (transformedEndpointProviders.length > 0)
      setSelectedEndpointProvider(transformedEndpointProviders[0].value);
  }, [endpoint.providers, transformedEndpointProviders]);

  return (
    <div style={{ padding: "10px 20px" }}>
      {/* {endpoint.genesisHash && <p>Genesis Hash: {endpoint.genesisHash}</p>} */}
      {endpoint.homepage && <p>Homepage: {endpoint.homepage}</p>}
      <Radio.Group
        onChange={(e) => setSelectedEndpointProvider(e.target.value)}
        value={selectedEndpointProvider}
      >
        <Space direction="vertical">
          {transformedEndpointProviders.map((providerItem) => (
            <Radio value={providerItem.value}>
              {providerItem.name} <br />
              <a style={{ fontSize: "smaller" }} href={providerItem.value}>
                {providerItem.value}
              </a>
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </div>
  );
};

export default ChainInfoCard;
