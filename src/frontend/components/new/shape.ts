import { RectangleAdapters } from "./adapters/rectangle-adapters";
import { Rectangle } from "./rectangle";
import { Vector2 } from "./vector2";

export class Shape {
    public rectangle: Rectangle;
    public verticies: Vector2[];

    constructor(verticies: Vector2[]) {
        this.verticies = verticies;
        this.rectangle = RectangleAdapters.fromPointArray(verticies);
    }
}
