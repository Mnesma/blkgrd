import type {
    BobbingEffectCallback,
    BouncingEffectInputs,
    BouncingEffectOptions
} from "../types/bouncing-effect-types";
import { Effect } from "./effect";

export class BouncingEffect extends Effect {
    static waveCount = 4;

    #time = 0;
    #callback: BobbingEffectCallback;
    #speed: number;
    #amplitude: number;

    constructor(
        callback: BobbingEffectCallback,
        { speed, amplitude }: BouncingEffectOptions
    ) {
        super({ maxFps: 60 });
        this.#callback = callback;
        this.#speed = speed;
        this.#amplitude = amplitude;
    }

    setAmplitude(newAmplitude: number): void {
        this.#amplitude = newAmplitude;
    }

    setSpeed(newSpeed: number): void {
        this.#speed = newSpeed;
    }

    getAmplitude() {
        return this.#amplitude;
    }

    getSpeed() {
        return this.#speed;
    }

    tick(deltaTime: number): void {
        this.#callback(({ offset }) => {
            return this.#getBobbingPosition({
                amplitude: this.#amplitude,
                time: this.#time,
                period: this.#period,
                offset
            });
        });
        this.#time += this.#speed * deltaTime;
    }

    get #period(): number {
        return BouncingEffect.waveCount * 2 * Math.PI;
    }

    #getBobbingPosition({
        amplitude,
        time,
        offset,
        period
    }: BouncingEffectInputs) {
        return Math.sin(time + (offset * period)) * amplitude;
    }
}
