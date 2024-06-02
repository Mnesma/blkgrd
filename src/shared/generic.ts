type TypeWithGeneric<T> = T[];

export type Generic<T> = T extends TypeWithGeneric<infer GenericType>
    ? GenericType
    : never;
