import { HappyPath, SadPath } from "../../shared/maybe-helpers";

import type { Instantiable } from "../../shared/instantiable";
import type { Maybe } from "../../shared/maybe";
import type { Optional } from "../../shared/optional";
import type { Descriptor } from "../types/descriptor";
import type { UndescribedObject } from "../types/undescribed-object";

const errorMessages = {
    doesntExist: (propertyName: string) => (
        `Property ${propertyName} does not exist on unknown object`
    ),
    invalidType: (propertyName: string) => (
        `Property ${propertyName} does not exist on unknown object`
    ),
    notInObject: (value: string, propertyName: string) => (
        `The value ("${value}") of property "${propertyName}" does not exist in target object`
    )
};

export const UnknownObject = (undescribedObject: UndescribedObject) => ({
    describedBy<DescribedShape extends object>(
        ...descriptors: Descriptor[]
    ): Maybe<DescribedShape> {
        for (const descriptor of descriptors) {
            const error = descriptor(undescribedObject);

            if (error) {
                return SadPath(error);
            }
        }

        return HappyPath(undescribedObject as DescribedShape);
    }
});

export const property = (propertyName: string) => ({
    exists: () => (undescribedObject: UndescribedObject): Optional<Error> => {
        if (Object.hasOwn(undescribedObject, propertyName)) {
            return null;
        }

        return new Error(errorMessages.doesntExist(propertyName));
    }
});

export const valueOf = (propertyName: string) => ({
    isType:
        (type: string | Instantiable) =>
        (undescribedObject: UndescribedObject): Optional<Error> => {
            const value = undescribedObject[propertyName];
            const useTypeof = typeof type === "string";
            const useInstanceof = !useTypeof;
            const isInstanceof = useInstanceof && value instanceof type;
            const isTypeof = useTypeof && value === type;

            if (useTypeof && isTypeof || useInstanceof && isInstanceof) {
                return null;
            }

            return new Error(errorMessages.invalidType(propertyName));
        },

    existsIn:
        <TargetObjectType extends object>(targetObject: TargetObjectType) =>
        (undescribedObject: UndescribedObject): Optional<Error> => {
            const value = undescribedObject[propertyName];
            const isString = typeof value === "string";

            if (isString && Object.hasOwn(targetObject, value)) {
                return null;
            }

            return new Error(
                errorMessages.notInObject(String(value), propertyName)
            );
        }
});
