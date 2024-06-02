import { Body } from "matter-js";
import { Container, Graphics, Sprite, Text } from "pixi.js";
import { AssetKey } from "../enums/asset-key";
import { BundleKey } from "../enums/bundle-key";
import { CharacterState } from "../enums/character-state";
import { Color } from "../enums/color";
import { LookDirection } from "../enums/look-direction";
import { RoomType } from "../enums/room-type";
import { GuildMemberLike } from "../interfaces/guild-member-like";
import { App } from "./app";
import { Bundles } from "./bundles";
import { GuildMember } from "./guild-member";

export class ZeroGuildMember extends EventTarget implements GuildMemberLike {
    #alpha: GuildMember;
    #beta: GuildMember;

    name: string;
    root = new Container();
    petContainer = new Container();
    body!: Body;
    health!: number;

    constructor(alpha: GuildMember, beta: GuildMember) {
        super();

        this.name = alpha.name;

        this.#alpha = alpha;
        this.#beta = beta;

        this.root.addChild(this.petContainer);

        const newBody = Body.create({
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
        });

        this.root.addChild(beta.root);
        this.root.addChild(alpha.root);

        Body.setPosition(beta.body, {
            x: alpha.body.position.x + 60,
            y: alpha.body.position.y
        });

        beta.root.position.x += 30;
        alpha.root.position.x -= 30;

        Body.setParts(newBody, [alpha.body, beta.body]);

        alpha.body = newBody.parts[1];
        beta.body = newBody.parts[2];

        alpha.addEventListener("changeroom", (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            event.stopPropagation();
            const roomType = (event as CustomEvent).detail;
            console.log("Emitting event", roomType);
            this.dispatchEvent(
                new CustomEvent("changeroom", {
                    detail: roomType
                })
            );
        });

        alpha.addEventListener("lookchanged", (event) => {
            const direction = (event as CustomEvent).detail;
            this.petContainer.scale.x = direction;

            beta.look(direction);
        });

        beta.addEventListener("lookchanged", (event) => {
            const direction = (event as CustomEvent).detail;
            this.petContainer.scale.x = direction;

            alpha.look(direction);
        });

        beta.namePlateContainer.visible = false;
        alpha.namePlateContainer.visible = false;

        const name = new Text({
            text: alpha.name,
            style: {
                fontFamily: AssetKey.Rubik,
                fontSize: "14px",
                fill: Color.White
            }
        });
        name.position.set(19, 0);

        const { minX, maxX } = name.bounds;
        const textWidth = maxX - minX;

        const x = -GuildMember.padding / 2;
        const y = 0;
        const width = textWidth + GuildMember.padding + 21;
        const height = 18;
        const borderRadius = 3;

        const bossIcon = new Sprite(
            Bundles.from(BundleKey.BossIcons)[alpha.bestSolo]
        );
        bossIcon.width = 16;
        bossIcon.height = 16;
        bossIcon.position.set(-GuildMember.padding + 5, 1);

        const background = new Graphics()
            .roundRect(x, y, width, height, borderRadius)
            .fill({ color: Color.Black, alpha: 0.5 });

        const namePlate = new Container();
        namePlate.addChild(background);
        namePlate.addChild(name);
        namePlate.addChild(bossIcon);
        namePlate.pivot.set(width / 2, 0);

        namePlate.position.set(
            0,
            24
        );

        const namePlateContainer = new Container();
        namePlateContainer.boundsArea = this.root.boundsArea;

        namePlateContainer.addChild(namePlate);
        this.root.addChild(namePlateContainer);
        // this whole project is so fucked
        this.body = newBody;

        alpha.speedEffect.body = newBody;
        beta.speedEffect.body = newBody;

        this.heal();
    }

    setState(state: CharacterState): void {
        this.#alpha.setState(state);
        this.#beta.setState(state);

        if (state === CharacterState.Tubing) {
            this.heal();
        }
    }

    look(direction: LookDirection): void {
        this.#alpha.look(direction);
        this.#beta.look(direction);
    }

    heal(): void {
        this.health = Math.ceil((this.#alpha.health + this.#beta.health) / 2);
    }

    damage(): void {
        if (!App.started) {
            return;
        }

        this.health--;

        if (this.health === 0) {
            console.log("Emitting event", RoomType.BelowWater);
            this.dispatchEvent(
                new CustomEvent("changeroom", { detail: RoomType.BelowWater })
            );
        }
    }
}
