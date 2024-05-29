import * as Pixi from "pixi.js";
import { BundleKey } from "../../enums/bundle-key";
import { LookDirection } from "../../enums/look-direction";
import { PixiRenderable } from "../../interfaces/new/pixi-renderable";
import { manifest } from "../../manifest";
import { GuildMemberManifestEntry } from "../../types/manifest-types";
import { App } from "../app";
import { Bundles } from "../bundles";
import { GenericPixiRenderable } from "./generic-pixi-renderable";
import { Sprite } from "./sprite";
import { Vector2 } from "./vector2";

export class Character implements PixiRenderable {
    public root = new Pixi.Container();
    public sprites: Record<string, Sprite> = {};

    constructor(private config: GuildMemberManifestEntry) {
        this.createSprites();
    }

    public look(direction: LookDirection): void {
        GenericPixiRenderable.look(this.root, direction);
    }

    public setPosition(newPosition: Vector2): void {
        GenericPixiRenderable.setPosition(this.root, newPosition);
    }

    private createSprites(): void {
        const { tubing, swimming } = this.config.animations;

        const swimmingTextures = Bundles.get(swimming.name);
        this.sprites.swimming = new Sprite(swimmingTextures, {
            animationSpeed: 0.2,
            offset: new Vector2(...swimming.offset),
            anchor: new Vector2(0.5, 0.5),
            loop: true
        });
        this.root.addChild(this.sprites.swimming.root);

        const tubingTextures = Bundles.get(tubing.name);
        this.sprites.tubing = new Sprite(tubingTextures, {
            animationSpeed: 0.35,
            offset: new Vector2(...tubing.offset),
            anchor: new Vector2(1, 0.5),
            loop: true
        });
        this.root.addChild(this.sprites.tubing.root);

        const { tubeType } = this.config;
        const tubeConfig = manifest.details.tubes[tubeType];

        const tubeTextures = Bundles.get(tubeConfig.bundleKey);
        this.sprites.tube = new Sprite(tubeTextures, {
            animationSpeed: 0.35,
            offset: Vector2.Zero,
            anchor: new Vector2(0.5, 1),
            loop: true
        });
        this.root.addChild(this.sprites.tube.root);

        const splashTextures = Bundles.get(BundleKey.SplashEffect);
        this.sprites.splash = new Sprite(splashTextures, {
            animationSpeed: 0.35,
            offset: Vector2.Zero,
            anchor: new Vector2(0.5, 1),
            loop: true
        });
        this.root.addChild(this.sprites.splash.root);

        const surfaceTextures = Bundles.get(BundleKey.SurfaceEffect);
        this.sprites.surface = new Sprite(surfaceTextures, {
            animationSpeed: 0.35,
            offset: Vector2.Zero,
            anchor: new Vector2(0.5, 1),
            loop: false
        });
        this.sprites.surface.addEventListener("complete", () => {
            this.sprites.surface.hide();
        });
        App.show(this.sprites.surface.root);

        const sinkTextures = Bundles.get(BundleKey.SinkEffect);
        this.sprites.sink = new Sprite(sinkTextures, {
            animationSpeed: 0.35,
            offset: Vector2.Zero,
            anchor: new Vector2(0.5, 1),
            loop: false
        });
        this.sprites.sink.addEventListener("complete", () => {
            this.sprites.sink.hide();
        });
        App.show(this.sprites.sink.root);
    }

    playSurfaceAnimation(): void {
        const tubePosition = this.sprites.tube.getGlobalPosition();
        this.sprites.surface.setPosition(tubePosition);
        this.sprites.surface.show();
    }

    playSinkAnimation(): void {
        const tubePosition = this.sprites.tube.getGlobalPosition();
        this.sprites.sink.setPosition(tubePosition);
        this.sprites.sink.show();
    }
}
