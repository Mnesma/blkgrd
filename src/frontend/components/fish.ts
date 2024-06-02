import { AnimatedSprite } from "pixi.js";
import { BundleKey } from "../enums/bundle-key";
import { LookDirection } from "../enums/look-direction";
import type { FishOptions } from "../types/fish-options";
import { Bundles } from "./bundles";
import { Utils } from "./utils";

export class Fish extends EventTarget {
    root: AnimatedSprite;

    #despawnLength: number;
    #lookDirection: LookDirection;
    #speed: number;
    #scaleModifier = Utils.random(0.8, 1);

    constructor(
        name: BundleKey,
        {
            lookDirection,
            despawnLength,
            startingPosition,
            minSpeed,
            maxSpeed
        }: FishOptions
    ) {
        super();
        this.root = new AnimatedSprite(Bundles.get(name));
        this.root.animationSpeed = 0.2;
        const randomStartingFrame = Utils.randomInt(0, this.root.totalFrames);
        this.root.gotoAndPlay(randomStartingFrame);
        this.root.position.set(startingPosition.x, startingPosition.y);
        this.root.scale.set(
            lookDirection * this.#scaleModifier,
            this.#scaleModifier
        );
        this.#lookDirection = lookDirection;
        const padding = 50;
        this.#despawnLength = despawnLength + this.root.width + padding;
        this.root.zIndex = this.#scaleModifier;
        this.#speed = Utils.random(minSpeed || 40, maxSpeed || 70);
    }

    move(deltaTime: number): void {
        const movement = this.#lookDirection * this.#speed * deltaTime
            * this.#scaleModifier;
        this.#despawnLength -= Math.abs(movement);

        if (this.#despawnLength > 0) {
            this.root.position.x -= movement;
        } else {
            this.root.removeFromParent();
            this.dispatchEvent(new CustomEvent("removed"));
        }
    }
}
