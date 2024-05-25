import { ContainerChild, PointData } from "pixi.js";

export type DebugOutlineOptions = {
    vertices?: PointData[];
    object?: ContainerChild;
    color?: number;
};
