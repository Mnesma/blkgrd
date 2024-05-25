import type { Texture } from "pixi.js";
import { AssetKey } from "../enums/asset-key";

export type Bundle = Record<AssetKey, Texture>;
