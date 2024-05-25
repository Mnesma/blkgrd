import { AnimatedSprite, Container, Sprite, Ticker } from "pixi.js";
import {
    POOL_WATER_START,
    SAND_START,
    UNDER_WATER_START
} from "../constants/start-positions";
import { BundleKey } from "../enums/bundle-key";
import { manifest } from "../manifest";
import { BouncingEffect } from "./bouncing-effect";
import { Bundles } from "./bundles";
import { DebugOutline } from "./debug-outline";
import { Utils } from "./utils";

export class StaticSprites {
    static get PoolBackground() {
        return new Sprite(Bundles.from(BundleKey.Pool).poolBackground);
    }

    static get PoolWater() {
        const sprite = new AnimatedSprite(Bundles.get(BundleKey.PoolWater));
        sprite.position.set(0, POOL_WATER_START);
        sprite.animationSpeed = 0.35;
        sprite.play();
        return sprite;
    }

    static get SlideTowerTop() {
        const sprite = new Sprite(
            Bundles.from(BundleKey.Pool).slideTowerTop
        );
        sprite.position.set(590, 79);
        return sprite;
    }

    static get SlideTowerBase() {
        const sprite = new Sprite(
            Bundles.from(BundleKey.Pool).slideTowerBase
        );
        sprite.position.set(594, 371);
        return sprite;
    }

    static get SlideForeground() {
        const sprite = new Sprite(
            Bundles.from(BundleKey.Pool).slideForeground
        );
        sprite.position.set(469, 367);
        return sprite;
    }

    static get Waterfall() {
        const sprite = new AnimatedSprite(Bundles.get(BundleKey.Waterfall));
        sprite.position.set(636, 264);
        sprite.animationSpeed = 0.35;
        sprite.play();
        return sprite;
    }

    static get SlideLeftBackground() {
        const sprite = new AnimatedSprite(
            Bundles.get(BundleKey.SlideLeftBackground)
        );
        sprite.position.set(393, 360);
        sprite.animationSpeed = 0.35;
        sprite.play();
        return sprite;
    }

    static get SlideRightBackground() {
        const sprite = new AnimatedSprite(
            Bundles.get(BundleKey.SlideRightBackground)
        );
        sprite.position.set(758, 362);
        sprite.animationSpeed = 0.35;
        sprite.play();
        return sprite;
    }

    static get UnderWaterBackground() {
        const sprite = new Sprite(
            Bundles.from(BundleKey.Pool).underWaterBackground
        );
        sprite.position.set(0, UNDER_WATER_START);
        return sprite;
    }

    static get UnderWaterMidground() {
        const sprite = new Sprite(
            Bundles.from(BundleKey.Pool).underWaterMidground
        );
        sprite.position.set(0, 1392);
        return sprite;
    }

    static get UnderWaterSand() {
        const sprite = new Sprite(
            Bundles.from(BundleKey.Pool).underWaterSand
        );
        sprite.position.set(0, SAND_START);
        return sprite;
    }

    static get UnderWaterForeground() {
        const sprite = new Sprite(
            Bundles.from(BundleKey.Pool).underWaterForeground
        );
        sprite.position.set(0, 1886);
        return sprite;
    }

    static get WaterEdges() {
        const waterEdgeSprites = new Container();
        manifest.details.waterEdgePositions.forEach(position => {
            const sprite = new AnimatedSprite(Bundles.get(BundleKey.WaterEdge));
            sprite.position.set(...position);
            sprite.animationSpeed = 0.35;
            sprite.play();
            waterEdgeSprites.addChild(sprite);
        });
        return waterEdgeSprites;
    }

    static getUnderWaterGodRay(type: 0 | 1, x: number, y = 0) {
        const rays = [
            new Sprite(
                Bundles.from(BundleKey.UnderWaterGodRay).underWaterGodRay0
            ),
            new Sprite(
                Bundles.from(BundleKey.UnderWaterGodRay).underWaterGodRay1
            )
        ];

        rays[type].alpha = 0;

        rays[0].position.set(x, 830 + y);
        rays[1].position.set(x, 830 + y);

        const container = new Container();
        container.addChild(rays[0]);
        container.addChild(rays[1]);

        const duration = 25;
        let time = type === 0 ? 0 : duration;
        const fps = 10;
        const animator = new Ticker();
        animator.maxFPS = fps;
        animator.add(() => {
            const ray = Math.floor(time / duration) % 2;
            const otherRay = Math.floor((time + duration) / duration) % 2;
            const sprite1 = rays[ray];
            const sprite2 = rays[otherRay];
            const stage = (time % duration) / duration;
            sprite1.alpha = stage;
            sprite2.alpha = 1 - stage;
            time++;
        });
        animator.start();

        return container;
    }

    static getUnderWaterParticles(x: number, y: number) {
        const container = new Container();

        const textures = Bundles.get(BundleKey.UnderWaterParticles);
        const textureIndex = Utils.randomInt(0, textures.length);
        const sprite = new Sprite(textures[textureIndex]);
        sprite.alpha = 0.5;
        sprite.anchor.set(0.5, 0.5);
        container.addChild(sprite);

        const spriteMiddle = {
            x: sprite.width / 2,
            y: sprite.height / 2
        };

        const randomRotation = Math.random() * Math.PI * 2;

        if (manifest.debugging) {
            const containerDebugOutline = new DebugOutline({
                object: container
            });
            containerDebugOutline.root.rotation = -randomRotation;
            container.addChild(containerDebugOutline.root);

            const spriteDebugOutline = new DebugOutline({
                object: sprite,
                color: 0xFF0000
            });
            spriteDebugOutline.root.rotation = randomRotation;
            container.addChild(spriteDebugOutline.root);
        }

        container.position.set(x + spriteMiddle.x, y + spriteMiddle.y);
        container.rotation = randomRotation;

        new BouncingEffect((calculator) => {
            const yChange = calculator({ offset: 0 });

            sprite.position.y = yChange;
        }, {
            speed: 0.3,
            amplitude: 20
        });

        return container;
    }
}
