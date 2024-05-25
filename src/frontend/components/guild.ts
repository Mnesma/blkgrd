import { Body, Events } from "matter-js";
import { Container } from "pixi.js";
import { BASE_CANVAS_HEIGHT, CANVAS_MIN_WIDTH } from "../constants/sizes";
import {
    POOL_WATER_START,
    UNDER_WATER_START
} from "../constants/start-positions";
import { CharacterState, characterStates } from "../enums/character-state";
import { RoomType, roomTypes } from "../enums/room-type";
import type { Actor } from "../interfaces/actor";
import { manifest } from "../manifest";
import { GuildMember } from "./guild-member";
import { Physics } from "./physics";
import { Utils } from "./utils";

export class Guild {
    static membersContainer = new Container();
    static members: Actor[] = [];
    static roster = new Map<string, GuildMember>();
    static bodyRoster = new Map<number, GuildMember>();

    static loadMembers(): void {
        manifest.details.guildMembers.forEach((member) => {
            const randomStartingArea = 0; // Utils.randomInt(0, roomTypes.length);
            const randomRoom = roomTypes[randomStartingArea];
            const state = characterStates[randomStartingArea];
            const [x, y] = this.getRandomStartingPosition(randomRoom);
            const newMember = new GuildMember(
                {
                    ...member,
                    initialState: state
                },
                x,
                y
            );

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
                        Body.setPosition(
                            newMember.body,
                            {
                                x: newMember.body.position.x,
                                y: this.getRandomY(RoomType.BelowWater)
                            }
                        );
                        break;
                }

                Body.setVelocity(newMember.body, { x: 0, y: 0 });
            });

            this.roster.set(member.name, newMember);
            this.membersContainer.addChild(newMember.root);
            this.bodyRoster.set(newMember.body.id, newMember);
            this.members.push(newMember);
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
