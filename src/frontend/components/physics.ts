import { Composite, Engine } from "matter-js";
import type { Body } from "matter-js";

export class Physics {
    static engine = Engine.create({
        gravity: { scale: 0 }
    });

    static add(...bodies: Body[]): void {
        Composite.add(Physics.engine.world, bodies);
    }

    static tick() {
        Engine.update(this.engine);
    }
}
