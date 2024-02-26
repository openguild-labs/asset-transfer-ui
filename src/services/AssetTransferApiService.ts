import { ApiOptions } from "@polkadot/api/types";
import {
  AssetTransferApi,
  constructApiPromise,
} from "@substrate/asset-transfer-api";

export const DestinationChainIds = {
  RelayChain: "0",
};

export async function createAssetTransferApi(
  wsUrl: string,
  opts?: ApiOptions | undefined
): Promise<AssetTransferApi> {
  const { api, specName, safeXcmVersion } = await constructApiPromise(
    wsUrl,
    opts
  );
  return new AssetTransferApi(api, specName, safeXcmVersion);
}

export default class AssetTransferApiService {
  assetsApi: AssetTransferApi | undefined = undefined;

  constructor(assetTransferApi: AssetTransferApi) {
    this.assetsApi = assetTransferApi;
  }

  createTransferTransaction(
    destChainId: keyof typeof DestinationChainIds,
    destAddress: string
  ) {
    if (!this.assetsApi) throw new Error("No asset api initialized");
    const call = this.assetsApi.createTransferTransaction(
      DestinationChainIds[destChainId], // destChainId (If the destination is a relay chain put `0`)
      destAddress,
      ["1", "2"], // Array of AssetIds
      ["1000000000", "2000000000"], // Array of amounts of each token to transfer
      {
        format: "call",
        isLimited: true,
        xcmVersion: 1,
      } // Options
    );
  }
}
