import type { Optional } from "../../shared/optional";
import type { UndescribedObject } from "./undescribed-object";

export type Descriptor = (baseObject: UndescribedObject) => Optional<Error>;
