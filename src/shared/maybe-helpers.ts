export function HappyPath<T>(value: T): [T, null] {
    return [value, null];
}

type ErrorConstructorParams = ConstructorParameters<typeof Error>;
type CombindSadPathParams = [Error] | ErrorConstructorParams;

export function SadPath(...args: ErrorConstructorParams): [null, Error];
export function SadPath(error: Error): [null, Error];
export function SadPath(...args: CombindSadPathParams): [null, Error] {
    const [errorOrMessage, errorOptions] = args;

    if (errorOrMessage instanceof Error) {
        return [null, errorOrMessage];
    }

    return [null, new Error(errorOrMessage, errorOptions)];
}
