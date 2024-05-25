import { Bodies, Body, Events } from "matter-js";
import { AnimatedSprite, Container, Graphics, Text } from "pixi.js";
import type { Bounds, PointData } from "pixi.js";
import { CANVAS_MIN_WIDTH } from "../constants/sizes";
import { BundleKey } from "../enums/bundle-key";
import { CharacterState } from "../enums/character-state";
import { Color } from "../enums/color";
import { LookDirection } from "../enums/look-direction";
import { RoomType } from "../enums/room-type";
import { SpeedState } from "../enums/speed-state";
import { TubeType } from "../enums/tube-type";
import { Actor } from "../interfaces/actor";
import { manifest } from "../manifest";
import type {
    GuildMemberCharacterSprites,
    GuildMemberOptions
} from "../types/guild-member-types";
import { BouncingEffect } from "./bouncing-effect";
import { Bundles } from "./bundles";
import { DebugOutline } from "./debug-outline";
import { MemberClickHitbox } from "./member-click-hitbox";
import { Physics } from "./physics";
import { Rooms } from "./rooms";
import { SpeedEffect } from "./speed-effect";
import { Tube } from "./tube";
import { Utils } from "./utils";

export class GuildMember extends EventTarget implements Actor {
    static padding = 8;
    static healthModifier = 2;

    #tube!: Tube;
    #characterSprites!: GuildMemberCharacterSprites;
    #background?: AnimatedSprite;
    #clickHitbox!: MemberClickHitbox;
    #splashSprite!: AnimatedSprite;
    #health!: number;
    #backgroundContainer = new Container();
    #characterContainer = new Container();
    #effectsContainer = new Container();
    #namePlateContainer = new Container();
    #clickHitboxContainer = new Container();
    #debugContainer = new Container();
    #debugOutlines: DebugOutline[] = [];
    #currentState!: CharacterState;
    #swimmingBodySize: [number, number];
    #bouncingEffect!: BouncingEffect;
    #speedEffect!: SpeedEffect;
    #animations: GuildMemberOptions["animations"];
    name: string;
    body!: Body;
    root = new Container();

    constructor(
        {
            name,
            tubeType,
            animations,
            initialState,
            background,
            swimmingBodySize
        }: GuildMemberOptions,
        x: number,
        y: number
    ) {
        super();
        this.name = name;
        this.#swimmingBodySize = swimmingBodySize;
        this.#animations = animations;

        this.root.addChild(this.#backgroundContainer);
        this.root.addChild(this.#characterContainer);
        this.root.addChild(this.#effectsContainer);
        this.root.addChild(this.#namePlateContainer);
        this.root.addChild(this.#debugContainer);
        this.root.addChild(this.#clickHitboxContainer);

        if (background) {
            this.#createBackground(background);
        }

        this.#createCharacterSprites();
        this.#createTube(tubeType);
        this.#createSplashSprite();
        this.#createClickHitbox();
        this.#createBody(x, y);
        this.#createNamePlate();

        this.setState(initialState);
    }

    setState(state: CharacterState): void {
        this.#characterContainer.removeChildren();
        this.#effectsContainer.removeChildren();
        this.#characterSprites.swimming.stop();
        this.#characterSprites.tubing.stop();
        this.#tube.root.stop();

        this.#currentState = state;

        const { max, min } = this.body.bounds;
        const currentWidth = max.x - min.x;
        const currentHeight = max.y - min.y;

        const { backgroundOffset } = this.#animations[state];
        if (backgroundOffset) {
            this.#background?.position.set(...backgroundOffset);
        }

        switch (state) {
            case CharacterState.Swimming:
                const { swimming } = this.#characterSprites;
                this.#characterContainer.addChild(swimming);
                swimming.play();
                Body.scale(
                    this.body,
                    this.#swimmingBodySize[0] / currentWidth,
                    this.#swimmingBodySize[1] / currentHeight
                );
                Body.setMass(this.body, 5);
                Body.setInertia(this.body, Infinity);
                this.#bouncingEffect.stop();
                this.#speedEffect.stop();
                break;
            case CharacterState.Tubing:
                this.#heal();
                const { tubing } = this.#characterSprites;
                this.#characterContainer.addChild(tubing);
                this.#characterContainer.addChild(this.#tube.root);
                this.#effectsContainer.addChild(this.#splashSprite);
                tubing.play();
                this.#tube.root.play();
                Body.scale(
                    this.body,
                    this.#tube.transform.width / currentWidth,
                    this.#tube.transform.height / currentHeight
                );
                Body.setInertia(this.body, Infinity);
                Body.setMass(this.body, this.#tube.mass);
                this.#bouncingEffect.start();
                this.#speedEffect.start();
                break;
        }

        this.#clickHitbox.readjust();
        this.#updateNamePlayeYOffset();

        if (manifest.debugging) {
            this.#drawDebuggingInfo();
        }
    }

    getCurrentCharacterPosition(): PointData {
        return this.#getCurrentCharacter().getGlobalPosition();
    }

    getCurrentCharacterBounds(): Bounds {
        return this.#characterContainer.getLocalBounds();
    }

    look(direction: LookDirection): void {
        this.#characterContainer.scale.x = direction;
        this.#backgroundContainer.scale.x = direction;
        this.#clickHitbox.root.scale.x = direction;
        this.#debugOutlines.forEach((outline) => {
            outline.look(direction);
        });
    }

    damage(): void {
        this.#health--;

        if (this.#health === 0) {
            this.dispatchEvent(
                new CustomEvent("changeroom", { detail: RoomType.BelowWater })
            );
        }
    }

    #createBackground(name: BundleKey): void {
        this.#background = new AnimatedSprite(Bundles.get(name));
        this.#background.anchor.set(0.5, 0.5);
        this.#background.animationSpeed = 0.35;
        this.#background.play();

        this.#backgroundContainer.addChild(this.#background);
    }

    #createCharacterSprites(): void {
        const swimming = new AnimatedSprite(
            Bundles.get(this.#animations.swimming.name)
        );
        const tubing = new AnimatedSprite(
            Bundles.get(this.#animations.tubing.name)
        );

        swimming.animationSpeed = 0.2;
        tubing.animationSpeed = 0.35;

        swimming.anchor.set(0.5, 0.5);
        tubing.anchor.set(0.5, 0.5);

        swimming.position.set(...this.#animations.swimming.offset);
        tubing.position.set(...this.#animations.tubing.offset);

        this.#characterSprites = {
            swimming,
            tubing
        };
    }

    #createTube(tubeType: TubeType): void {
        this.#tube = new Tube(tubeType);
        const { transform } = this.#tube;
        this.#tube.root.position.set(-transform.x, -transform.y);
    }

    #createSplashSprite() {
        this.#splashSprite = new AnimatedSprite(
            Bundles.get(BundleKey.SplashEffect)
        );
        const { height, width } = this.#tube.transform;
        this.#splashSprite.animationSpeed = 0.35;
        this.#splashSprite.anchor.set(0.5, 1);
        this.#splashSprite.position.set(0, height / 2 + 5);
        this.#splashSprite.scale.x = width / this.#splashSprite.width;
        this.#splashSprite.alpha = 0;
    }

    #createNamePlate(): void {
        const name = new Text({
            text: this.name,
            style: {
                fontFamily: "rubik",
                fontSize: "14px",
                fill: Color.White
            }
        });

        const { minX, maxX } = name.bounds;
        const textWidth = maxX - minX;

        const arbitraryXOffset = 5;
        const x = -GuildMember.padding / 2;
        const y = 0;
        const width = textWidth + GuildMember.padding;
        const height = 16;
        const borderRadius = 3;
        const center = width / 2;

        const background = new Graphics()
            .roundRect(x, y, width, height, borderRadius)
            .fill({ color: Color.Black, alpha: 0.5 });

        const namePlate = new Container();
        namePlate.addChild(background);
        namePlate.addChild(name);

        namePlate.position.set(
            -center + arbitraryXOffset,
            0
        );

        this.#namePlateContainer.boundsArea =
            this.#clickHitboxContainer.boundsArea;

        this.#namePlateContainer.addChild(namePlate);
    }

    #updateNamePlayeYOffset() {
        const arbitraryYOffset = 10;
        this.#namePlateContainer.position.y =
            (this.body.bounds.max.y - this.body.bounds.min.y) / 2
            + arbitraryYOffset;
    }

    #createClickHitbox(): void {
        this.#clickHitbox = new MemberClickHitbox(this);
        this.#clickHitboxContainer.addChild(this.#clickHitbox.root);
    }

    #heal() {
        this.#health = Math.ceil(GuildMember.healthModifier * this.body.mass);
    }

    #createBody(x: number, y: number): void {
        const { transform } = this.#tube;

        this.body = Bodies.rectangle(
            x,
            y,
            transform.width,
            transform.height,
            {
                frictionAir: 0.01,
                friction: 0,
                frictionStatic: 0,
                restitution: 1,
                inertia: Infinity,
                render: {
                    strokeStyle: "#FF0000",
                    fillStyle: "transparent",
                    lineWidth: 1
                }
            }
        );

        const minBounceSpeed = 4;
        const maxBounceSpeed = 10;
        const maxSpeed = 7;
        const slowSpeed = 3;
        const verySlowSpeed = 0.9;
        const maxAmplitude = 4;
        const minAmplitude = 1;
        const poolWidth = CANVAS_MIN_WIDTH;

        this.#bouncingEffect = new BouncingEffect((calculator) => {
            const { x } = this.body.position;
            const offset = x / poolWidth;

            const yChange = calculator({ offset });

            this.#characterContainer.position.y = yChange;
            this.#effectsContainer.position.y = yChange;
        }, { speed: minBounceSpeed, amplitude: minAmplitude });

        this.#speedEffect = new SpeedEffect((state, direction) => {
            const { speed } = this.body;

            if (speed > maxSpeed) {
                Body.setSpeed(this.body, maxSpeed);
            }

            switch (state) {
                case SpeedState.Stopped: {
                    this.#splashSprite.scale.y = 0;
                    this.#splashSprite.stop();
                    this.#splashSprite.alpha = 0;
                    this.#bouncingEffect.setAmplitude(minAmplitude);
                    this.#bouncingEffect.setSpeed(minBounceSpeed);
                    return;
                }
                case SpeedState.BasicallyStopped: {
                    Body.setSpeed(this.body, 0);
                    break;
                }
                case SpeedState.Fast: {
                    this.#splashSprite.scale.y = 1;
                    this.#splashSprite.alpha = 0.9;
                    this.#splashSprite.play();
                    this.#bouncingEffect.setAmplitude(maxAmplitude);
                    this.#bouncingEffect.setSpeed(maxBounceSpeed);
                    break;
                }
                case SpeedState.Slow: {
                    const speedRatio = speed / slowSpeed;
                    this.#bouncingEffect.setAmplitude(
                        Utils.lerp(maxAmplitude, minAmplitude, speedRatio)
                    );
                    this.#bouncingEffect.setSpeed(
                        Utils.lerp(maxBounceSpeed, minBounceSpeed, speedRatio)
                    );
                    this.#splashSprite.scale.y = Math.min(
                        speed / (slowSpeed * 1.5),
                        1
                    );
                    break;
                }
                case SpeedState.VerySlow: {
                    const speedRatio = speed / slowSpeed;
                    this.#bouncingEffect.setAmplitude(
                        Utils.lerp(maxAmplitude, minAmplitude, speedRatio)
                    );
                    this.#bouncingEffect.setSpeed(
                        Utils.lerp(maxBounceSpeed, minBounceSpeed, speedRatio)
                    );
                    this.#splashSprite.scale.y = 0;
                    this.#splashSprite.stop();
                    this.#splashSprite.alpha = 0;
                    break;
                }
            }

            this.#effectsContainer.scale.x = -direction;
        }, {
            body: this.body,
            slowSpeed,
            verySlowSpeed
        });

        Events.on(Physics.engine, "collisionStart", ({ pairs }) => {
            if (this.#currentState !== CharacterState.Swimming) {
                return;
            }

            const { bodyA, bodyB } = pairs[0];

            const { id } = this.body;
            const obstacleId = Rooms.divider.body.id;
            const collisionIncludesSelf = id === bodyB.id;
            const collisionIncludesDivider = obstacleId === bodyA.id;

            const collidedWithDivider = collisionIncludesSelf
                && collisionIncludesDivider;

            if (collidedWithDivider) {
                this.dispatchEvent(
                    new CustomEvent("changeroom", {
                        detail: RoomType.AboveWater
                    })
                );
            }
        });
    }

    #getCurrentCharacter(): AnimatedSprite {
        return this.#characterContainer.getChildAt(0);
    }

    #drawDebuggingInfo(): void {
        this.#debugContainer.removeChildren();
        this.#debugOutlines = [];
        const { min, max } = this.body.bounds;
        const bodyWidth = max.x - min.x;
        const bodyHeight = max.y - min.y;
        const bodyVertices = [
            {
                x: -bodyWidth / 2,
                y: -bodyHeight / 2
            },
            {
                x: bodyWidth / 2,
                y: -bodyHeight / 2
            },
            {
                x: bodyWidth / 2,
                y: bodyHeight / 2
            },
            {
                x: -bodyWidth / 2,
                y: bodyHeight / 2
            }
        ];

        const originVertices = [
            { x: -1, y: -1 },
            { x: 1, y: -1 },
            { x: 1, y: 1 },
            { x: -1, y: 1 }
        ];

        const debugOutlineOptions = [
            { object: this.root },
            { object: this.#backgroundContainer, color: Color.Green },
            { object: this.#getCurrentCharacter() },
            { object: this.#characterContainer, color: Color.Blue },
            { object: this.#namePlateContainer },
            { vertices: bodyVertices, color: Color.Red },
            { vertices: originVertices, color: Color.Red },
            { object: this.#clickHitbox.root, color: Color.Yellow }
        ];

        if (this.#currentState === CharacterState.Tubing) {
            debugOutlineOptions.push(
                { object: this.#tube.root }
            );
        }

        debugOutlineOptions.forEach((options) => {
            const outline = new DebugOutline(options);
            this.#debugContainer.addChild(outline.root);
            this.#debugOutlines.push(outline);
        });
    }
}
