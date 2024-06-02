export type Instantiable = {
    [Symbol.hasInstance](instance: unknown): boolean;
};
