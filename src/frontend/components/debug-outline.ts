import { Bounds } from "matter-js";
import { Container, Graphics, Rectangle } from "pixi.js";
import type { ContainerChild, PointData } from "pixi.js";
import { LookDirection } from "../enums/look-direction";
import type { DebugOutlineOptions } from "../types/debug-outline-options";

export class DebugOutline {
    root = new Container();
    #outlines = new Container();

    constructor(
        { vertices, object, color }: DebugOutlineOptions
    ) {
        const polygonVerticies = DebugOutline.getVertices(vertices, object);

        const outline = new Graphics()
            .poly(polygonVerticies, true)
            .stroke({ color: color || 0x000000, width: 1 });

        this.#outlines.addChild(outline);
        this.root.addChild(this.#outlines);
    }

    look(direction: LookDirection) {
        this.#outlines.scale.x = direction;
    }

    static pointDataToRectangle(pointData: PointData[]): Rectangle {
        const { min, max } = Bounds.create(pointData);
        return new Rectangle(
            min.x,
            min.y,
            max.x - min.x,
            max.y - min.y
        );
    }

    static getVertices(
        verticies?: PointData[],
        object?: ContainerChild
    ): PointData[] {
        if (verticies) {
            return verticies;
        }

        if (object?.boundsArea) {
            const bounds = object.boundsArea;
            const { x, y } = object.position;
            return [
                { x: bounds.x + x, y: bounds.y + y },
                { x: bounds.x + bounds.width + x, y: bounds.y + y },
                {
                    x: bounds.x + bounds.width + x,
                    y: bounds.y + bounds.height + y
                },
                { x: bounds.x + x, y: bounds.y + bounds.height + y }
            ];
        }

        if (object) {
            const { minX, maxX, minY, maxY } = object.getLocalBounds();
            const { x, y } = object.position;
            return [
                { x: minX + x, y: minY + y },
                { x: maxX + x, y: minY + y },
                { x: maxX + x, y: maxY + y },
                { x: minX + x, y: maxY + y }
            ];
        }

        return [];
    }
}
