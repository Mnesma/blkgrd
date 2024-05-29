import * as Pixi from "pixi.js";
import { Vector2 } from "../vector2";

export class Vector2Adapters {
    public static fromPixiObservablePoint(
        observablePoint: Pixi.ObservablePoint
    ): Vector2 {
        return new Vector2(observablePoint.x, observablePoint.y);
    }

    public static fromPixiPoint(point: Pixi.Point): Vector2 {
        return new Vector2(point.x, point.y);
    }
}
