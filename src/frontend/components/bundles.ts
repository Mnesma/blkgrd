import { Assets, Texture } from "pixi.js";
import { BundleKey } from "../enums/bundle-key";
import { manifest } from "../manifest";
import type { Bundle } from "../types/bundle";

export class Bundles {
    static bundles: Record<BundleKey, Bundle>;
    static textures: Record<BundleKey, Texture[]>;

    static async load() {
        await Assets.init({ manifest: manifest.pixiManifest });

        Bundles.bundles = {} as Record<BundleKey, Bundle>;
        Bundles.textures = {} as Record<BundleKey, Texture[]>;

        for (const key of Object.values(BundleKey)) {
            const bundle = await Assets.loadBundle(key);

            if (bundle) {
                Bundles.bundles[key] = bundle;
                Bundles.textures[key] = Bundles.asTextures(bundle);
            }
        }

        document.querySelector(".loader")?.remove();
    }

    static asTextures(bundle: Bundle): Texture[] {
        return Object.values(bundle);
    }

    static from(bundleName: BundleKey): Bundle {
        return Bundles.bundles[bundleName];
    }

    static get(bundleName: BundleKey): Texture[] {
        return Bundles.textures[bundleName];
    }
}
