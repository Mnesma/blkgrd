import { AnimatedSprite } from "pixi.js";
import { CharacterState } from "../enums/character-state";
import type { GuildMemberManifestEntry } from "./manifest-types";

export type GuildMemberOptions = GuildMemberManifestEntry & {
    initialState: CharacterState;
};

export type GuildMemberCharacterSprites = {
    swimming: AnimatedSprite;
    tubing: AnimatedSprite;
};
