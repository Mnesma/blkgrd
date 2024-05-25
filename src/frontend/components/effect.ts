import { Ticker } from "pixi.js";
import { SECOND } from "../constants/time";
import type { EffectOptions } from "../types/effect-options";

export class Effect {
    #ticker = new Ticker();
    #lastTime = performance.now();

    constructor({
        maxFps,
        startAutomatically
    }: EffectOptions) {
        this.#ticker.maxFPS = maxFps || 10;
        this.#ticker.add(() => {
            const deltaTime = performance.now() - this.#lastTime;
            this.#lastTime = performance.now();
            this.tick(deltaTime / SECOND);
        });

        if (startAutomatically !== false) {
            this.#ticker.start();
        }
    }

    start(): void {
        this.#ticker.start();
    }

    stop(): void {
        this.#ticker.stop();
    }

    tick(_: number): void {}
}
