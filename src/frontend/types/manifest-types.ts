import type { AssetsManifest } from "pixi.js";
import { BossName } from "../enums/boss-name";
import { BundleKey } from "../enums/bundle-key";
import { TubeType } from "../enums/tube-type";
import type { AssetDefinition } from "./asset-definition";

export type GuildMemberManifestEntry = {
    name: string;
    isZeroAlpha?: boolean;
    isZeroBeta?: boolean;
    animations: {
        tubing: AssetDefinition;
        swimming: AssetDefinition;
    };
    swimmingBodySize: [number, number];
    pet?: {
        key: BundleKey;
        swimmingOffset: [number, number];
        tubingOffset: [number, number];
    };
    bestSolo: BossName;
    background?: BundleKey;
    tubeType: TubeType;
};

export type Manifest = {
    pixiManifest: AssetsManifest;
    details: {
        waterEdgePositions: [number, number][];
        guildMembers: GuildMemberManifestEntry[];
    };
    debugging: boolean;
};
