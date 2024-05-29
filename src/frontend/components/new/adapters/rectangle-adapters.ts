import * as Pixi from "pixi.js";
import { Rectangle } from "../rectangle";
import { Vector2 } from "../vector2";

export class RectangleAdapters {
    public static fromPixiRectangle(pixiRectangle: Pixi.Rectangle): Rectangle {
        const start = new Vector2(pixiRectangle.x, pixiRectangle.y);

        return new Rectangle(
            start,
            pixiRectangle.width,
            pixiRectangle.height
        );
    }

    public static fromPixiBounds(pixiBounds: Pixi.Bounds): Rectangle {
        const { minX, maxX, minY, maxY } = pixiBounds;

        return new Rectangle(
            new Vector2(minX, minY),
            maxX - minX,
            maxY - minY
        );
    }

    public static fromPointArray(verticies: Vector2[]): Rectangle {
        const x = {
            min: Infinity,
            max: -Infinity
        };

        const y = {
            min: Infinity,
            max: -Infinity
        };

        verticies.forEach((vertex) => {
            if (vertex.x < x.min) {
                x.min = vertex.x;
            }

            if (vertex.x > x.max) {
                x.max = vertex.x;
            }

            if (vertex.y < y.min) {
                y.min = vertex.y;
            }

            if (vertex.y > y.max) {
                y.max = vertex.y;
            }
        });

        const start = new Vector2(x.min, y.min);
        const width = x.max - x.min;
        const height = y.max - y.min;

        return new Rectangle(start, width, height);
    }
}
