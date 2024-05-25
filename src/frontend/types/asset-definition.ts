import { BundleKey } from "../enums/bundle-key";

export type AssetDefinition = {
    name: BundleKey;
    offset: [number, number];
    backgroundOffset?: [number, number];
};
