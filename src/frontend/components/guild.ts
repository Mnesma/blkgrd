import { Body, Events, Vector } from "matter-js";
import { AnimatedSprite, Container } from "pixi.js";
import { BASE_CANVAS_HEIGHT, CANVAS_MIN_WIDTH } from "../constants/sizes";
import {
    POOL_WATER_START,
    UNDER_WATER_START
} from "../constants/start-positions";
import { BundleKey } from "../enums/bundle-key";
import { CharacterState } from "../enums/character-state";
import { LookDirection } from "../enums/look-direction";
import { RoomType } from "../enums/room-type";
import type { Actor } from "../interfaces/actor";
import { GuildMemberLike } from "../interfaces/guild-member-like";
import { manifest } from "../manifest";
import { Bundles } from "./bundles";
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
        { alpha?: GuildMember; beta?: GuildMember; }
    >();
    static bodyRoster = new Map<number, GuildMemberLike>();

    static loadMembers(): void {
        const rows = 5;
        const columns = 13;
        const columnSize = CANVAS_MIN_WIDTH / columns;
        const rowSize = 200 / rows;
        let currentRow = 0;
        let currentColumn = 0;
        manifest.details.guildMembers.sort(() => {
            return Utils.randomInt(-1, 1);
        }).forEach((member) => {
            const offset = Utils.randomInt(0, 30);
            const x = currentColumn++ * columnSize + offset;
            const y = currentRow++ * rowSize + POOL_WATER_START + 44;

            if (currentRow >= rows) {
                currentRow = 0;
            }

            if (currentColumn >= columns) {
                currentColumn = 0;
            }
            const newMember = new GuildMember(
                {
                    ...member,
                    initialState: CharacterState.Tubing
                },
                x,
                y
            );

            if (member.pet) {
                this.setPet(newMember, member.pet.key, member.pet.tubingOffset);
            }

            const isOnLeft = x < (CANVAS_MIN_WIDTH / 2);

            if (isOnLeft && !member.isZeroAlpha && !member.isZeroBeta) {
                newMember.look(LookDirection.Left); // this makes them look right
                // no I'm not fixing it
            }

            if (member.isZeroAlpha) {
                const existingConfig = this.zeroRoster.get(member.name) || {};
                this.zeroRoster.set(member.name, {
                    ...existingConfig,
                    alpha: newMember
                });
            }

            if (member.isZeroBeta) {
                const existingConfig = this.zeroRoster.get(member.name) || {};
                this.zeroRoster.set(member.name, {
                    ...existingConfig,
                    beta: newMember
                });
            }

            const zero = this.zeroRoster.get(member.name);
            if (!zero) {
                this.recordNewMember(newMember);
            } else if (zero.beta && zero.alpha) {
                this.recordNewZeroMember(member.name);
            }
        });

        Events.on(Physics.engine, "collisionStart", ({ pairs }) => {
            const { bodyA, bodyB } = pairs[0];

            const guildMemeberA = this.bodyRoster.get(bodyA.parent.id);
            const guildMemeberB = this.bodyRoster.get(bodyB.parent.id);
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
            zeroConfig.alpha!,
            zeroConfig.beta
        );

        if (zeroConfig.alpha!.startingX < (CANVAS_MIN_WIDTH / 2)) {
            newZeroGuildMember.look(LookDirection.Left);
        }

        this.recordNewMember(newZeroGuildMember);
    }

    static recordNewMember(newMember: GuildMemberLike): void {
        newMember.addEventListener("changeroom", (event) => {
            const roomType = (event as CustomEvent).detail;

            switch (roomType) {
                case RoomType.AboveWater: {
                    newMember.setState(CharacterState.Tubing);
                    Body.setPosition(
                        newMember.body.parent,
                        {
                            x: newMember.body.parent.position.x,
                            y: this.getRandomY(RoomType.AboveWater)
                        }
                    );
                    const petPosition = newMember.pet?.tubingOffset;
                    if (petPosition) {
                        newMember.petContainer.children[0].position.set(
                            ...petPosition
                        );
                    }
                    break;
                }
                case RoomType.BelowWater: {
                    newMember.setState(CharacterState.Swimming);
                    const angle = 90 * (Math.PI / 180);
                    const force = Vector.rotate(
                        Vector.create(0.4, 0),
                        angle
                    );

                    newMember.body.parent.collisionFilter.mask = 2;
                    newMember.body.parent.collisionFilter.group = 2;
                    Body.setVelocity(
                        newMember.body.parent,
                        Vector.create(0, 0)
                    );
                    const originalAirFriction =
                        newMember.body.parent.frictionAir;
                    Body.set(newMember.body.parent, "frictionAir", 0.06);
                    setTimeout(() => {
                        Body.applyForce(
                            newMember.body.parent,
                            newMember.body.parent.position,
                            force
                        );
                    });
                    setTimeout(() => {
                        Body.set(
                            newMember.body.parent,
                            "frictionAir",
                            originalAirFriction
                        );
                        newMember.body.parent.collisionFilter.mask = -1;
                        newMember.body.parent.collisionFilter.group = 0;
                    }, 1000);
                    const petPosition = newMember.pet?.swimmingOffset;
                    if (petPosition) {
                        newMember.petContainer.children[0].position.set(
                            ...petPosition
                        );
                    }
                    break;
                }
            }

            Body.setVelocity(newMember.body.parent, { x: 0, y: 0 });
        });

        this.roster.set(newMember.name, newMember);
        this.membersContainer.addChild(newMember.root);
        this.bodyRoster.set(newMember.body.parent.id, newMember);
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

    static setPet(
        member: GuildMemberLike,
        petType: BundleKey,
        offset: [number, number]
    ): void {
        switch (petType) {
            case BundleKey.Reaper: {
                const sprite = new AnimatedSprite(
                    Bundles.get(BundleKey.Reaper)
                );
                sprite.animationSpeed = 0.35;
                sprite.position.set(...offset);
                sprite.anchor.set(0, 1);
                sprite.play();
                sprite.zIndex = -Infinity;
                member.petContainer.addChild(sprite);
                break;
            }
            case BundleKey.Monkey: {
                const sprite = new AnimatedSprite(
                    Bundles.get(BundleKey.Monkey)
                );
                sprite.animationSpeed = 0.35;
                sprite.position.set(...offset);
                sprite.anchor.set(0, 1);
                sprite.play();
                sprite.zIndex = -Infinity;
                member.petContainer.addChild(sprite);
                break;
            }
        }
    }
}
