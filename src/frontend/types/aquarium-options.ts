import { BundleKey } from "../enums/bundle-key";

export type AquariumOptions = {
    minY: number;
    maxY: number;
    width: number;
    minSpawnTime: number;
    maxSpawnTime: number;
    fishTypes: BundleKey[];
    limit?: number;
    minSpeed?: number;
    maxSpeed?: number;
    startTime?: number;
};
