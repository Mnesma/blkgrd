import { Body, Events, Vector } from "matter-js";
import { Container } from "pixi.js";
import { BASE_CANVAS_HEIGHT, CANVAS_MIN_WIDTH } from "../constants/sizes";
import {
    POOL_WATER_START,
    UNDER_WATER_START
} from "../constants/start-positions";
import { CharacterState } from "../enums/character-state";
import { RoomType } from "../enums/room-type";
import type { Actor } from "../interfaces/actor";
import { GuildMemberLike } from "../interfaces/guild-member-like";
import { manifest } from "../manifest";
import { GuildMember } from "./guild-member";
import { Physics } from "./physics";
import { Utils } from "./utils";
import { ZeroGuildMember } from "./zero-guild-member";

export class Guild {
    static membersContainer = new Container();
    static members: Actor[] = [];
    static roster = new Map<string, GuildMemberLike>();
    static zeroRoster = new Map<
        string,
        { alpha: GuildMember; beta?: GuildMember; }
    >();
    static bodyRoster = new Map<number, GuildMemberLike>();

    static loadMembers(): void {
        manifest.details.guildMembers.forEach((member) => {
            const [x, y] = this.getRandomStartingPosition(RoomType.AboveWater);
            const newMember = new GuildMember(
                {
                    ...member,
                    initialState: CharacterState.Tubing
                },
                x,
                y
            );

            if (member.isZeroAlpha) {
                this.zeroRoster.set(member.name, {
                    alpha: newMember
                });
                return;
            }

            if (member.isZeroBeta && this.zeroRoster.has(member.name)) {
                const existingConfig = this.zeroRoster.get(member.name)!;

                this.zeroRoster.set(member.name, {
                    ...existingConfig,
                    beta: newMember
                });
                this.recordNewZeroMember(member.name);
                return;
            }

            console.log(member.name, newMember.body.collisionFilter.group);
            console.log(member.name, newMember.body.collisionFilter.mask);

            this.recordNewMember(newMember);
        });

        Events.on(Physics.engine, "collisionStart", ({ pairs }) => {
            const { bodyA, bodyB } = pairs[0];

            const guildMemeberA = this.bodyRoster.get(bodyA.id);
            const guildMemeberB = this.bodyRoster.get(bodyB.id);
            const guildMembersCollided = guildMemeberA && guildMemeberB;

            if (guildMembersCollided) {
                guildMemeberA.damage();
                guildMemeberB.damage();
            }
        });
    }

    static recordNewZeroMember(zeroName: string): void {
        const zeroConfig = this.zeroRoster.get(zeroName);

        if (!zeroConfig) {
            throw new Error(
                `Unexpectedly missing zero config for zero: ${zeroName}`
            );
        }

        if (!zeroConfig.beta) {
            throw new Error(
                `Missing beta for zero: ${zeroName}`
            );
        }

        const newZeroGuildMember = new ZeroGuildMember(
            zeroConfig.alpha,
            zeroConfig.beta
        );

        this.recordNewMember(newZeroGuildMember);
    }

    static recordNewMember(newMember: GuildMemberLike): void {
        newMember.addEventListener("changeroom", (event) => {
            const roomType = (event as CustomEvent).detail;

            switch (roomType) {
                case RoomType.AboveWater:
                    newMember.setState(CharacterState.Tubing);
                    Body.setPosition(
                        newMember.body,
                        {
                            x: newMember.body.position.x,
                            y: this.getRandomY(RoomType.AboveWater)
                        }
                    );
                    break;
                case RoomType.BelowWater:
                    newMember.setState(CharacterState.Swimming);
                    const angle = 90 * (Math.PI / 180);
                    const force = Vector.rotate(
                        Vector.create(0.4, 0),
                        angle
                    );

                    newMember.body.collisionFilter.mask = 2;
                    newMember.body.collisionFilter.group = 2;
                    Body.setVelocity(newMember.body, Vector.create(0, 0));
                    const originalAirFriction = newMember.body.frictionAir;
                    Body.set(newMember.body, "frictionAir", 0.06);
                    setTimeout(() => {
                        Body.applyForce(
                            newMember.body,
                            newMember.body.position,
                            force
                        );
                    });
                    setTimeout(() => {
                        Body.set(
                            newMember.body,
                            "frictionAir",
                            originalAirFriction
                        );
                        newMember.body.collisionFilter.mask = -1;
                        newMember.body.collisionFilter.group = 0;
                    }, 1000);
                    break;
            }

            Body.setVelocity(newMember.body, { x: 0, y: 0 });
        });

        this.roster.set(newMember.name, newMember);
        this.membersContainer.addChild(newMember.root);
        this.bodyRoster.set(newMember.body.id, newMember);
        this.members.push(newMember);
    }

    static getRandomY(roomType: RoomType): number {
        const topPadding = 44;
        const bottomPadding = 78;
        const waterStartY = POOL_WATER_START + topPadding;
        const waterEndY = UNDER_WATER_START - bottomPadding;

        switch (roomType) {
            case RoomType.AboveWater:
                return Utils.randomInt(waterStartY, waterEndY);
            case RoomType.BelowWater:
                return Utils.randomInt(
                    UNDER_WATER_START + 200,
                    UNDER_WATER_START + 250
                );
        }
    }

    static getRandomStartingPosition(roomType: RoomType): [number, number] {
        const topPadding = 44;
        const bottomPadding = 78;

        const waterStartY = POOL_WATER_START + topPadding;
        const waterEndY = UNDER_WATER_START - bottomPadding;
        const sandEndY = BASE_CANVAS_HEIGHT - 50 - bottomPadding;

        switch (roomType) {
            case RoomType.AboveWater:
                return [
                    Utils.randomInt(0, CANVAS_MIN_WIDTH),
                    Utils.randomInt(waterStartY, waterEndY)
                ];
            case RoomType.BelowWater:
                return [
                    Utils.randomInt(0, CANVAS_MIN_WIDTH),
                    Utils.randomInt(UNDER_WATER_START, sandEndY)
                ];
        }
    }
}
