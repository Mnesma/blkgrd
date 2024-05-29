import { Body } from "matter-js";
import { Container } from "pixi.js";
import { CharacterState } from "../enums/character-state";
import { LookDirection } from "../enums/look-direction";
import { RoomType } from "../enums/room-type";
import { GuildMemberLike } from "../interfaces/guild-member-like";
import { GuildMember } from "./guild-member";

export class ZeroGuildMember extends EventTarget implements GuildMemberLike {
    #alpha: GuildMember;
    #beta: GuildMember;

    name: string;
    root = new Container();
    body!: Body;
    health!: number;

    constructor(alpha: GuildMember, beta: GuildMember) {
        super();

        this.name = alpha.name;

        this.#alpha = alpha;
        this.#beta = beta;

        this.body = Body.create({});

        this.root.addChild(alpha.root);
        this.root.addChild(beta.root);

        Body.setPosition(beta.body, {
            x: alpha.body.position.x - 50,
            y: alpha.body.position.y
        });

        beta.root.position.x -= 50;

        Body.setParts(this.body, [alpha.body, beta.body]);

        // Body.setParts(alpha.body, [alpha.body, beta.body]);

        console.log(alpha.body.collisionFilter.group);
        console.log(alpha.body.collisionFilter.mask);

        this.heal();
    }

    setState(state: CharacterState): void {
        this.#alpha.setState(state);
        this.#beta.setState(state);
    }

    look(direction: LookDirection): void {
        this.#alpha.look(direction);
        this.#beta.look(direction);
    }

    heal(): void {
        this.health = Math.ceil((this.#alpha.health + this.#beta.health) / 2);
    }

    damage(): void {
        this.health--;

        if (this.health === 0) {
            this.dispatchEvent(
                new CustomEvent("changeroom", { detail: RoomType.BelowWater })
            );
        }
    }
}
