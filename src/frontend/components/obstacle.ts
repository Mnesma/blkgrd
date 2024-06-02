import { Bodies } from "matter-js";
import type { Body } from "matter-js";
import { Container, Graphics } from "pixi.js";
import type { Actor } from "../interfaces/actor";
import { manifest } from "../manifest";

export class Obstacle implements Actor {
    root = new Container();
    body: Body;

    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        bodyOptions: Partial<Body> = {
            isStatic: true,
            slop: 0,
            friction: 0,
            frictionStatic: 0,
            restitution: 1,
            render: {
                strokeStyle: "#000000",
                fillStyle: "transparent",
                lineWidth: 2
            }
        }
    ) {
        this.body = Bodies.rectangle(
            x + width / 2,
            y + height / 2,
            width,
            height,
            bodyOptions
        );
        if (manifest.debugging) {
            this.#drawDebugInfo(0, 0, width, height);
        }
    }

    #drawDebugInfo(x: number, y: number, width: number, height: number) {
        const outline = new Graphics()
            .poly([
                { x: 0 - width / 2, y: 0 - height / 2 },
                { x: width / 2, y: 0 - height / 2 },
                { x: width / 2, y: height / 2 },
                { x: 0 - width / 2, y: height / 2 }
            ], true)
            .stroke({ color: 0x000000, width: 1 });
        this.root.addChild(outline);
    }
}
