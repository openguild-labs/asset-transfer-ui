import React from "react";
import { ChainTypeSet, RelayChainSet } from "../stores/useAssetTransferStore";
import ChainSelector from "./ChainSelector";
import {
  prodParasKusama,
  prodParasKusamaCommon,
  prodParasPolkadot,
  prodParasPolkadotCommon,
  testParasRococo,
  testParasRococoCommon,
  testParasWestend,
  testParasWestendCommon,
} from "@polkadot/apps-config";

type Props = {
  selectedChainType: ChainTypeSet;
  selectedRelayChain: RelayChainSet;
};

const RelaychainSelector = ({
  selectedChainType,
  selectedRelayChain,
}: Props) => {
  return (
    <React.Fragment>
      {selectedRelayChain === "polkadot" && (
        <React.Fragment>
          {selectedChainType === "para" && (
            <ChainSelector chainOptions={prodParasPolkadot} />
          )}
          {selectedChainType === "common" && (
            <ChainSelector chainOptions={prodParasPolkadotCommon} />
          )}
          {selectedChainType === "relay" && <ChainSelector chainOptions={[]} />}
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
          {selectedChainType === "relay" && <ChainSelector chainOptions={[]} />}
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
          {selectedChainType === "relay" && <ChainSelector chainOptions={[]} />}
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
          {selectedChainType === "relay" && <ChainSelector chainOptions={[]} />}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default RelaychainSelector;
