import type { AssetsManifest } from "pixi.js";
import { Vector2 } from "../components/new/vector2";
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
    background?: BundleKey;
    tubeType: TubeType;
};

type TubeManifestEntry = {
    name: TubeType;
    bundleKey: BundleKey;
    boundsDimensions: Vector2;
    boundsOffset: Vector2;
    mass: number;
};

export type Manifest = {
    pixiManifest: AssetsManifest;
    details: {
        waterEdgePositions: [number, number][];
        guildMembers: GuildMemberManifestEntry[];
        tubes: Record<TubeType, TubeManifestEntry>;
    };
    debugging: boolean;
};
