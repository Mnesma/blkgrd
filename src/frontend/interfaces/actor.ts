import type { Body } from "matter-js";
import type { ContainerChild } from "pixi.js";

export interface Actor {
    root: ContainerChild;
    body: Body;
}
