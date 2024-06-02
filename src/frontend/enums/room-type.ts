export enum RoomType {
    AboveWater = "aboveWater",
    BelowWater = "belowWater"
}

export const roomTypes = [
    RoomType.AboveWater,
    RoomType.BelowWater
] as const;
