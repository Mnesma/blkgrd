import * as Pixi from "pixi.js";
import { Color } from "../../enums/color";
import { LookDirection } from "../../enums/look-direction";
import { PixiRenderable } from "../../interfaces/new/pixi-renderable";
import { RectangleAdapters } from "./adapters/rectangle-adapters";
import { ShapeAdapters } from "./adapters/shape-adapters";
import { Vector2Adapters } from "./adapters/vector2-adapters";
import { Debug } from "./debug";
import { Flag } from "./flags";
import { GenericPixiRenderable } from "./generic-pixi-renderable";
import { Rectangle } from "./rectangle";
import { Shape } from "./shape";
import { Vector2 } from "./vector2";

export type Options = {
    debugFlag?: Flag;
    debugColor?: Color;
    animationSpeed?: number;
    anchor?: Vector2;
    offset?: Vector2;
    loop?: boolean;
};

export class Sprite extends EventTarget implements PixiRenderable {
    public root = new Pixi.Container();

    private shape: Shape;
    private sprite: Pixi.AnimatedSprite;
    private debugOutline?: Pixi.Graphics;

    constructor(textures: Pixi.Texture[], options: Options = {}) {
        super();

        this.sprite = new Pixi.AnimatedSprite(textures);

        if (options.animationSpeed !== undefined) {
            this.sprite.animationSpeed = options.animationSpeed;
        }

        if (options.anchor !== undefined) {
            this.sprite.anchor.set(options.anchor.x, options.anchor.y);
        }

        if (options.offset !== undefined) {
            this.sprite.position.set(options.offset.x, options.offset.y);
        }

        if (options.loop !== undefined) {
            this.sprite.loop = options.loop;
        }

        this.root.addChild(this.sprite);

        this.shape = ShapeAdapters.fromPixiContainerChild(this.root);

        if (options.debugFlag) {
            this.initDebug(options.debugFlag, options.debugColor);
        }

        this.hide();

        this.sprite.onComplete = () => {
            this.dispatchEvent(new Event("complete"));
        };
    }

    public hide(): void {
        this.root.alpha = 0;
        this.sprite.stop();
    }

    public show(): void {
        this.root.alpha = 1;
        this.sprite.gotoAndPlay(0);
    }

    public look(direction: LookDirection): void {
        GenericPixiRenderable.look(this.root, direction);
    }

    public getBounds(): Rectangle {
        return RectangleAdapters.fromPixiBounds(this.root.getBounds());
    }

    public getLocalPosition(): Vector2 {
        return Vector2Adapters.fromPixiObservablePoint(this.root.position);
    }

    public getGlobalPosition(): Vector2 {
        return Vector2Adapters.fromPixiPoint(this.root.getGlobalPosition());
    }

    public setPosition(newPosition: Vector2): void {
        this.root.position.set(newPosition.x, newPosition.y);
    }

    private initDebug(debugFlag: Flag, color: Color = Color.Black): void {
        this.debugOutline = new Pixi.Graphics()
            .poly(this.shape.verticies, true)
            .stroke({ color, width: 1 });

        this.root.addChild(this.debugOutline);

        Debug.addEventListener(debugFlag.isSet(), () => {
            if (this.debugOutline !== undefined) {
                this.debugOutline.alpha = 1;
            }
        });

        Debug.addEventListener(debugFlag.isUnset(), () => {
            if (this.debugOutline !== undefined) {
                this.debugOutline.alpha = 0;
            }
        });
    }
}
