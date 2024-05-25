import type { Body } from "matter-js";
import {
    AbstractRenderer,
    Application,
    BackgroundSystem,
    Container,
    Ticker
} from "pixi.js";
import type { ContainerChild } from "pixi.js";
import type { Actor } from "../interfaces/actor";
import { Physics } from "./physics";

export class App {
    static pixiApp = new Application();
    static rootContainer = new Container();
    static gameLoop = new Ticker();
    static actors: Actor[] = [];

    static get canvas() {
        return this.pixiApp.canvas;
    }

    static async init() {
        AbstractRenderer.defaultOptions.resolution = window.devicePixelRatio;
        BackgroundSystem.defaultOptions.backgroundAlpha = 0;

        await this.pixiApp.init({ resizeTo: document.body });
        document.body.appendChild(this.canvas);

        this.pixiApp.stage.addChild(this.rootContainer);
    }

    static show(child: ContainerChild): void {
        this.rootContainer.addChild(child);
    }

    static addStaticBodies(bodies: Body[]): void {
        bodies.forEach(body => {
            Physics.add(body);
        });
    }

    static addActors(actors: Actor[]): void {
        this.actors.push(...actors);

        actors.forEach(actor => {
            Physics.add(actor.body);
        });
    }

    static start() {
        this.pixiApp.start();
        this.gameLoop.maxFPS = 60;
        this.gameLoop.add(this.tick);
        this.gameLoop.start();
    }

    static tick() {
        Physics.tick();
        App.actors.forEach(actor => {
            const { x, y } = actor.body.position;
            actor.root.position.set(x, y);
            actor.root.zIndex = y;
        });
    }

    static resize() {
        this.pixiApp.resize();
    }
}
