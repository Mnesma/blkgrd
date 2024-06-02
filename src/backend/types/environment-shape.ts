import type { Generic } from "../../shared/generic";

export type SupportedConstructors =
    | StringConstructor
    | BooleanConstructor
    | NumberConstructor;

export type EnvironmentShape = {
    [key: string]: SupportedConstructors;
};

export type ConstructedValue<Constructor extends SupportedConstructors> =
    Generic<Constructor> | Constructor extends StringConstructor ? string
        : Generic<Constructor> | Constructor extends BooleanConstructor
            ? boolean
        : Generic<Constructor> | Constructor extends NumberConstructor ? number
        : never;

export type VerifiedEnv<Shape extends EnvironmentShape> = {
    [Key in keyof Shape]: ConstructedValue<Shape[Key]>;
};
