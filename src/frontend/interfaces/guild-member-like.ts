import { Body } from "matter-js";
import { Container } from "pixi.js";
import { CharacterState } from "../enums/character-state";
import { LookDirection } from "../enums/look-direction";

export interface GuildMemberLike extends EventTarget {
    name: string;
    root: Container;
    body: Body;
    health: number;

    setState(state: CharacterState): void;
    look(direction: LookDirection): void;
    damage(): void;
    heal(): void;
}
