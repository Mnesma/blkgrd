export class Vector2 {
    public static readonly Up = new Vector2(0, 1);
    public static readonly Right = new Vector2(1, 0);
    public static readonly Down = new Vector2(0, -1);
    public static readonly Left = new Vector2(-1, 0);
    public static readonly Zero = new Vector2(0, 0);

    constructor(public x: number, public y: number) {}
}
