import "../assets/shared/fonts/Rubik-Regular.ttf";
import { AssetKey } from "../enums/asset-key";

export class Fonts {
    static async load() {
        const fontFace = new FontFace(
            AssetKey.Rubik,
            "url(public/shared/fonts/Rubik-Regular.ttf)"
        );

        const loadedFontFace = await fontFace.load();

        document.fonts.add(loadedFontFace);

        return document.fonts.ready;
    }
}
