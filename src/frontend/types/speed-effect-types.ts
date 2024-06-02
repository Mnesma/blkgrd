import type { Body } from "matter-js";
import { LookDirection } from "../enums/look-direction";
import { SpeedState } from "../enums/speed-state";

export type SpeedEffectCallback = (
    state: SpeedState,
    direction: LookDirection
) => void;

export type SpeedEffectOptions = {
    body: Body;
    slowSpeed: number;
    verySlowSpeed: number;
};
