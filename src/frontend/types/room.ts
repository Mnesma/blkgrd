import type { Body } from "matter-js";
import type { Container } from "pixi.js";

export type Room = {
    bodies: Body[];
    root: Container;
};
