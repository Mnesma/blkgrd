import type { Body } from "matter-js";
import { LookDirection } from "../enums/look-direction";
import { SpeedState } from "../enums/speed-state";
import type {
    SpeedEffectCallback,
    SpeedEffectOptions
} from "../types/speed-effect-types";
import { Effect } from "./effect";

export class SpeedEffect extends Effect {
    callback: SpeedEffectCallback;
    body: Body;
    slowSpeed: number;
    verySlowSpeed: number;

    constructor(
        callback: SpeedEffectCallback,
        { body, slowSpeed, verySlowSpeed }: SpeedEffectOptions
    ) {
        super({ maxFps: 20 });
        this.callback = callback;
        this.body = body;
        this.slowSpeed = slowSpeed;
        this.verySlowSpeed = verySlowSpeed;
    }

    getDirection(xVelocity: number): LookDirection {
        if (xVelocity > 0) {
            return LookDirection.Right;
        }

        return LookDirection.Left;
    }

    tick(): void {
        const { speed, velocity } = this.body;

        const movingFast = speed > this.slowSpeed;
        const movingSlow = !movingFast && speed >= this.verySlowSpeed;
        const movingVerySlow = speed < this.verySlowSpeed;
        const basicallyStopped = speed <= 0.1;
        const direction = this.getDirection(velocity.x);

        if (speed === 0) {
            return this.callback(
                SpeedState.Stopped,
                direction
            );
        }

        if (basicallyStopped) {
            return this.callback(
                SpeedState.BasicallyStopped,
                direction
            );
        }

        if (movingFast) {
            return this.callback(
                SpeedState.Fast,
                direction
            );
        }

        if (movingSlow) {
            return this.callback(
                SpeedState.Slow,
                direction
            );
        }

        if (movingVerySlow) {
            return this.callback(
                SpeedState.VerySlow,
                direction
            );
        }
    }
}
