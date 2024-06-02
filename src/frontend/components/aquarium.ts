import { Container } from "pixi.js";
import { SECOND } from "../constants/time";
import { BundleKey } from "../enums/bundle-key";
import { LookDirection, lookDirections } from "../enums/look-direction";
import type { AquariumOptions } from "../types/aquarium-options";
import { Effect } from "./effect";
import { Fish } from "./fish";
import { Utils } from "./utils";

export class Aquarium extends Effect {
    root = new Container();

    #spawnTime = performance.now();
    #time = performance.now();
    #fishTypes: BundleKey[] = [];
    #fish = new Set<Fish>();
    #minSpawnTime: number;
    #maxSpawnTime: number;
    #width: number;
    #minY: number;
    #maxY: number;
    #limit: number;
    #minSpeed?: number;
    #maxSpeed?: number;

    constructor({
        minY,
        maxY,
        width,
        minSpawnTime,
        maxSpawnTime,
        fishTypes,
        limit,
        minSpeed,
        maxSpeed,
        startTime
    }: AquariumOptions) {
        const maxFps = 30;
        super({ maxFps, startAutomatically: false });
        this.#fishTypes = fishTypes;
        this.#minSpawnTime = minSpawnTime;
        this.#maxSpawnTime = maxSpawnTime;
        this.#width = width;
        this.#minY = minY;
        this.#maxY = maxY;
        this.#limit = limit || Infinity;
        this.#minSpeed = minSpeed;
        this.#maxSpeed = maxSpeed;

        const amountOfTicksToRun = (startTime || 0) / maxFps;
        const idealDeltaTime = SECOND / maxFps / SECOND;
        for (let i = 0; i < amountOfTicksToRun; i++) {
            this.tick(idealDeltaTime);
        }

        this.start();
    }

    tick(deltaTime: number) {
        this.#time += deltaTime;

        if (this.#time > this.#spawnTime && this.#fish.size < this.#limit) {
            const randomFishType = Utils.randomInt(0, this.#fishTypes.length);
            const randomLookDirection = lookDirections[Utils.randomInt(0, 2)];
            const startingX = randomLookDirection === LookDirection.Left
                ? 0
                : this.#width;
            const startingY = Utils.randomInt(this.#minY, this.#maxY);
            const newFish = new Fish(
                this.#fishTypes[randomFishType],
                {
                    lookDirection: randomLookDirection,
                    despawnLength: this.#width,
                    startingPosition: { x: startingX, y: startingY },
                    minSpeed: this.#minSpeed,
                    maxSpeed: this.#maxSpeed
                }
            );
            newFish.addEventListener("removed", () => {
                this.#fish.delete(newFish);
            }, { once: true });
            this.#fish.add(newFish);
            this.root.addChild(newFish.root);

            const nextSpawnCooldown = Utils.randomInt(
                this.#minSpawnTime,
                this.#maxSpawnTime
            ) / SECOND;
            this.#spawnTime = this.#time + nextSpawnCooldown;
        }

        this.#fish.forEach((fish) => {
            fish.move(deltaTime);
        });
    }
}
