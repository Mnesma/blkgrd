import process from "node:process";
import { HappyPath, SadPath } from "../../shared/maybe-helpers";

import type { Maybe } from "../../shared/maybe";
import type {
    ConstructedValue,
    EnvironmentShape,
    SupportedConstructors,
    VerifiedEnv
} from "../types/environment-shape";
import type { UndescribedObject } from "../types/undescribed-object";

export class Utilities {
    public static messageToJson(message: string): Maybe<UndescribedObject> {
        try {
            const json: UndescribedObject = JSON.parse(message);

            return HappyPath(json);
        } catch (error) {
            if (error instanceof Error) {
                return SadPath(error);
            }

            return SadPath(`Could not parse message: ${message}`);
        }
    }

    public static getEnvironment<T extends EnvironmentShape>(
        expectedEnvShape: T
    ): Maybe<VerifiedEnv<T>> {
        const environmentVariables = <VerifiedEnv<T>> {};

        for (const [key, type] of Object.entries(expectedEnvShape)) {
            const [value, error] = this.getEnvironmentVariableAsType(key, type);

            if (error) {
                return [null, error];
            }

            // @ts-ignore
            environmentVariables[key] = value;
        }

        return [environmentVariables, null];
    }

    private static getEnvironmentVariableAsType<
        T extends SupportedConstructors
    >(key: string, type: T): Maybe<ConstructedValue<T>> {
        const rawValue = process.env[key];

        if (rawValue === undefined) {
            return [null, Error(`Missing ${key} from environment variables`)];
        }

        switch (type) {
            case String:
                return HappyPath(rawValue! as ConstructedValue<T>);
            case Number:
                return HappyPath(+rawValue! as ConstructedValue<T>);
            case Boolean:
                return HappyPath((rawValue! === "true") as ConstructedValue<T>);
            default:
                return SadPath(
                    `Invalid ${type} provided for value ${rawValue}`
                );
        }
    }
}
