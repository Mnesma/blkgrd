import * as Pixi from "pixi.js";
import { LookDirection } from "../../enums/look-direction";
import { Vector2 } from "./vector2";

export class GenericPixiRenderable {
    public static look(
        containerChild: Pixi.ContainerChild,
        direction: LookDirection
    ): void {
        switch (direction) {
            case LookDirection.Left:
                containerChild.scale.x = 1;
                break;
            case LookDirection.Right:
                containerChild.scale.x = -1;
                break;
        }
    }

    public static setPosition(
        containerChild: Pixi.ContainerChild,
        newPosition: Vector2
    ): void {
        containerChild.position.set(newPosition.x, newPosition.y);
    }
}
