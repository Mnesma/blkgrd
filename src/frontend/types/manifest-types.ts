import type { AssetsManifest } from "pixi.js";
import { BundleKey } from "../enums/bundle-key";
import { TubeType } from "../enums/tube-type";
import type { AssetDefinition } from "./asset-definition";

export type GuildMemberManifestEntry = {
    name: string;
    animations: {
        tubing: AssetDefinition;
        swimming: AssetDefinition;
    };
    swimmingBodySize: [number, number];
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
