export type BouncingEffectInputs = {
    amplitude: number;
    offset: number;
    period: number;
    time: number;
};

export type BouncingEffectExternalInputs = Pick<BouncingEffectInputs, "offset">;

export type BouncingEffectCalculator = (
    inputs: BouncingEffectExternalInputs
) => number;

export type BobbingEffectCallback = (
    calculator: BouncingEffectCalculator
) => void;

export type BouncingEffectOptions =
    & { speed: number; }
    & Pick<BouncingEffectInputs, "amplitude">;
