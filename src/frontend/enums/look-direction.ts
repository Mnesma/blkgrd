export enum LookDirection {
    Right = 1,
    Left = -1
}

export const lookDirections = [
    LookDirection.Left,
    LookDirection.Right
] as const;
