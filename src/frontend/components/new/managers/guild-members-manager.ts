import { BASE_CANVAS_HEIGHT, CANVAS_MIN_WIDTH } from "../../../constants/sizes";
import {
    POOL_WATER_START,
    UNDER_WATER_START
} from "../../../constants/start-positions";
import { RoomType } from "../../../enums/room-type";
import { Manager } from "../../../interfaces/new/manager";
import { manifest } from "../../../manifest";
import { Utils } from "../../utils";
import { Character } from "../character";
import { GuildMember } from "../guild-member";
import { Vector2 } from "../vector2";

class _GuildMembersManager implements Manager {
    public roster = new Map<string, GuildMember>();

    public async init() {
        const zeroAlphas = new Map<string, Character>();

        manifest.details.guildMembers.forEach((guildMemberConfig) => {
            const { name } = guildMemberConfig;
            const [x, y] = this.getRandomStartingPosition(RoomType.AboveWater);
            const newCharacter = new Character(guildMemberConfig);

            if (guildMemberConfig.isZeroAlpha) {
                zeroAlphas.set(name, newCharacter);
                return;
            }

            const characters = [];

            if (guildMemberConfig.isZeroBeta && zeroAlphas.has(name)) {
                characters.push(zeroAlphas.get(name)!);
            }

            characters.push(newCharacter);

            const newMember = new GuildMember(name, characters, x, y);

            this.roster.set(name, newMember);
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

    private getRandomStartingPosition(roomType: RoomType): [number, number] {
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

export const GuildMembersManager = new _GuildMembersManager();
