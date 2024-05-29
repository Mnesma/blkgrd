import { Vector2 } from "./vector2";

export class Rectangle {
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    constructor(
        start: Vector2,
        width: number,
        height: number
    ) {
        this.x = start.x;
        this.y = start.y;
        this.width = width;
        this.height = height;
    }
}
