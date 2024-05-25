import type { PointData } from "pixi.js";
import type { LookDirection } from "../enums/look-direction";

export type FishOptions = {
    lookDirection: LookDirection;
    despawnLength: number;
    startingPosition: PointData;
    minSpeed?: number;
    maxSpeed?: number;
};
