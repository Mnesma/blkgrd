export enum CharacterState {
    Tubing = "tubing",
    Swimming = "swimming"
}

export const characterStates = [
    CharacterState.Tubing,
    CharacterState.Swimming
] as const;
