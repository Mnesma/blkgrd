import * as Pixi from "pixi.js";
import { Vector2 } from "../../components/new/vector2";
import { LookDirection } from "../../enums/look-direction";

export interface PixiRenderable {
    root: Pixi.ContainerChild;

    look(direction: LookDirection): void;

    setPosition(newPosition: Vector2): void;
}
