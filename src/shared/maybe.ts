export type Maybe<HappyType, SadType = Error> = [HappyType, null] | [
    null,
    SadType
];
