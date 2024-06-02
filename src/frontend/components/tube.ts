import { AnimatedSprite, Rectangle } from "pixi.js";
import { BundleKey } from "../enums/bundle-key";
import { TubeType, tubeTypes } from "../enums/tube-type";
import { Bundles } from "./bundles";
import { Utils } from "./utils";

export class Tube {
    root!: AnimatedSprite;
    transform!: Rectangle;
    mass!: number;

    constructor(tubeType: TubeType) {
        this.setType(tubeType);
    }

    setType(tubeType: TubeType) {
        switch (tubeType) {
            case TubeType.Flamingo:
                this.root = new AnimatedSprite(
                    Bundles.get(BundleKey.FlamingoTube)
                );
                this.transform = new Rectangle(8, 24, 88, 28);
                this.mass = 2.464;
                break;
            case TubeType.Blue:
                this.root = new AnimatedSprite(
                    Bundles.get(BundleKey.BlueTube)
                );
                this.transform = new Rectangle(0, -4, 88, 28);
                this.mass = 2.464;
                break;
            case TubeType.Red:
                this.root = new AnimatedSprite(
                    Bundles.get(BundleKey.RedTube)
                );
                this.transform = new Rectangle(0, -4, 88, 28);
                this.mass = 2.464;
                break;
            case TubeType.Tubelet:
                this.root = new AnimatedSprite(
                    Bundles.get(BundleKey.TubeletTube)
                );
                this.transform = new Rectangle(0, -4, 88, 28);
                this.mass = 2.464;
                break;
            case TubeType.Tray:
                this.root = new AnimatedSprite(
                    Bundles.get(BundleKey.TrayTube)
                );
                this.transform = new Rectangle(0, 8, 155, 42);
                this.mass = 6.51;
                break;
            case TubeType.Floatlet:
                this.root = new AnimatedSprite(
                    Bundles.get(BundleKey.FloatletTube)
                );
                this.transform = new Rectangle(2, 18, 120, 31);
                this.mass = 3.72;
                break;
            default:
                const randomTube =
                    tubeTypes[Utils.randomInt(0, tubeTypes.length)];
                this.setType(randomTube);
                return;
        }

        this.root.anchor.set(0.5, 0.5);
        this.root.animationSpeed = 0.35;
    }
}
