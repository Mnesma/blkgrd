import * as Pixi from "pixi.js";
import { Shape } from "../shape";
import { Vector2 } from "../vector2";

export class ShapeAdapters {
    public static fromPixiContainerChild(
        containerChild: Pixi.ContainerChild
    ): Shape {
        const { top, right, bottom, left } = containerChild.getLocalBounds();
        return new Shape([
            new Vector2(left, top),
            new Vector2(right, top),
            new Vector2(right, bottom),
            new Vector2(left, bottom)
        ]);
    }
}
