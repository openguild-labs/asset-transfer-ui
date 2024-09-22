import { EndpointOption } from "@polkadot/apps-config/endpoints/types";
import { create } from "zustand";

export type RelayChainSet = "polkadot" | "kusama" | "rococo" | "westend";
export type ChainTypeSet = "common" | "para" | "relay";

interface Props {
  selectedRelayChain: RelayChainSet;
  setSelectedRelayChain: any;
  selectedChainType: ChainTypeSet;
  setSelectedChainType: any;
  selectedEndpointOption: EndpointOption | undefined;
  setSelectedEndpointOption: any;
  selectedAssetsIds: string[];
  setSelectedAssetIds: any;
}

export const useAssetTransferStore = create<Props>((set) => ({
  selectedRelayChain: "polkadot",
  selectedChainType: "common",
  selectedEndpointOption: undefined,
  selectedAssetsIds: [],
  setSelectedEndpointOption: (endpointOption: EndpointOption | undefined) =>
    set((state) => ({ selectedEndpointOption: endpointOption })),
  setSelectedRelayChain: (relayChain: RelayChainSet) =>
    set((state) => ({ selectedRelayChain: relayChain })),
  setSelectedChainType: (chainType: ChainTypeSet) =>
    set((state) => ({ selectedChainType: chainType })),
  setSelectedAssetIds: (assetIds: string[]) =>
    set((state) => ({
      selectedAssetsIds: assetIds,
    })),
}));
