import { Flag, Flags, FlagsMode } from "./flags";

export const DebugFlag = {
    StaticSprites: new Flag(),
    GuildMemberSprites: new Flag(),
    GuildMemberBodies: new Flag()
};

export const Debug = new Flags(FlagsMode.Or);
