import { Container } from "pixi.js";
import { CANVAS_MIN_WIDTH } from "../constants/sizes";
import { SAND_START, UNDER_WATER_START } from "../constants/start-positions";
import { MINUTE, SECOND } from "../constants/time";
import { BundleKey } from "../enums/bundle-key";
import { Aquarium } from "./aquarium";
import { Bundles } from "./bundles";
import { StaticSprites } from "./static-sprites";
import { Utils } from "./utils";

export class CanvasDecorations {
    static get background(): Container {
        const container = new Container();
        container.addChild(StaticSprites.PoolWater);
        container.addChild(StaticSprites.PoolBackground);
        container.addChild(StaticSprites.SlideTowerTop);
        container.addChild(StaticSprites.Waterfall);
        container.addChild(StaticSprites.SlideTowerBase);
        container.addChild(StaticSprites.SlideLeftBackground);
        container.addChild(StaticSprites.SlideRightBackground);
        container.addChild(StaticSprites.SlideForeground);
        container.addChild(StaticSprites.UnderWaterBackground);

        const backgroundFish1Band = {
            top: 100,
            bottom: 300
        };
        const backgroundFish1 = new Aquarium({
            minY: UNDER_WATER_START + backgroundFish1Band.top,
            maxY: UNDER_WATER_START + backgroundFish1Band.bottom,
            fishTypes: [
                BundleKey.FishSchool1,
                BundleKey.FishSchool2,
                BundleKey.FishSchool3
            ],
            width: CANVAS_MIN_WIDTH,
            minSpawnTime: 0,
            maxSpawnTime: 0,
            limit: 1,
            minSpeed: 20,
            maxSpeed: 30,
            startTime: MINUTE
        });
        container.addChild(backgroundFish1.root);

        const backgroundFish2Band = {
            top: 360,
            bottom: 650
        };
        const backgroundFish2 = new Aquarium({
            minY: UNDER_WATER_START + backgroundFish2Band.top,
            maxY: UNDER_WATER_START + backgroundFish2Band.bottom,
            fishTypes: [
                BundleKey.FishSchool1,
                BundleKey.FishSchool2,
                BundleKey.FishSchool3
            ],
            width: CANVAS_MIN_WIDTH,
            minSpawnTime: 0,
            maxSpawnTime: 0,
            limit: 1,
            minSpeed: 20,
            maxSpeed: 30,
            startTime: MINUTE
        });
        container.addChild(backgroundFish2.root);

        const midgroundFishScale = 0.7;
        const scaleCompensation = 1 + midgroundFishScale + 0.1;
        const midgroundFishTopPadding = 300 * scaleCompensation;
        const midgroundFishBottomPadding = 350 * scaleCompensation;
        const midgroundFish = new Aquarium({
            minY: UNDER_WATER_START
                + midgroundFishTopPadding * scaleCompensation,
            maxY: SAND_START * scaleCompensation - midgroundFishBottomPadding,
            fishTypes: [
                BundleKey.Fish1Blurred,
                BundleKey.Fish2Blurred,
                BundleKey.Fish3Blurred
            ],
            width: CANVAS_MIN_WIDTH * scaleCompensation,
            minSpawnTime: 1 * SECOND,
            maxSpawnTime: 12 * SECOND,
            startTime: MINUTE
        });
        midgroundFish.root.scale.set(midgroundFishScale, midgroundFishScale);
        container.addChild(midgroundFish.root);

        container.addChild(StaticSprites.UnderWaterMidground);

        const foregroundFishTopPadding = 200;
        const foregroundFish = new Aquarium({
            minY: UNDER_WATER_START + foregroundFishTopPadding,
            maxY: SAND_START,
            fishTypes: [BundleKey.Fish1, BundleKey.Fish2, BundleKey.Fish3],
            width: CANVAS_MIN_WIDTH,
            minSpawnTime: 1 * SECOND,
            maxSpawnTime: 12 * SECOND,
            startTime: MINUTE
        });
        container.addChild(foregroundFish.root);

        container.addChild(StaticSprites.UnderWaterSand);
        container.addChild(StaticSprites.WaterEdges);
        return container;
    }

    static get foreground(): Container {
        const container = new Container();

        container.addChild(StaticSprites.UnderWaterForeground);

        const underWaterParticles = Bundles.get(BundleKey.UnderWaterParticles);
        const particlesWidth = underWaterParticles[0].width;
        const particlesHeight = underWaterParticles[0].height;
        const underWaterParticlesPadding = 50;
        const underWaterStart = UNDER_WATER_START + underWaterParticlesPadding;

        const columns = 6;
        const rows = 3;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                const skip = Utils.randomInt(0, 6) === 0;

                if (skip) {
                    continue;
                }

                const x = j * particlesWidth + underWaterParticlesPadding;
                const y = Utils.randomInt(
                    i * particlesHeight + underWaterStart,
                    i * particlesHeight + underWaterStart
                        + underWaterParticlesPadding
                ) + 100;
                container.addChild(StaticSprites.getUnderWaterParticles(x, y));
            }
        }

        container.addChild(StaticSprites.getUnderWaterGodRay(0, -175));
        container.addChild(StaticSprites.getUnderWaterGodRay(1, 375));
        container.addChild(StaticSprites.getUnderWaterGodRay(0, 725));
        return container;
    }
}
