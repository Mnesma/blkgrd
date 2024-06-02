import { v8_0_0 } from "pixi.js";
import { BASE_CANVAS_HEIGHT, CANVAS_MIN_WIDTH } from "../constants/sizes";
import { UNDER_WATER_START } from "../constants/start-positions";
import { App } from "./app";

export class CanvasSizeManager {
    static verticalScale = BASE_CANVAS_HEIGHT / CANVAS_MIN_WIDTH;

    static start(): void {
        const canvasContainer = App.canvas.parentElement;

        if (!canvasContainer) {
            throw new Error("The canvas has not been put inside the document");
        }

        canvasContainer.style.setProperty("min-width", `${CANVAS_MIN_WIDTH}px`);

        this.adjustCanvas();

        window.addEventListener("resize", this.adjustCanvas);
        window.scrollTo({
            left: (document.body.clientWidth - window.innerWidth) / 2,
            top: Math.max(
                0,
                UNDER_WATER_START * App.rootContainer.scale.x
                    - window.innerHeight + 25
            )
        });
    }

    static adjustCanvas = () => {
        const canvasContainer = App.canvas.parentElement;

        if (!canvasContainer) {
            throw new Error("The canvas has not been put inside the document");
        }

        const { width } = canvasContainer.getBoundingClientRect();
        const newHorizontalScale = Math.max(width / CANVAS_MIN_WIDTH, 1);
        const newWidth = Math.round(newHorizontalScale * CANVAS_MIN_WIDTH);
        const newHeight = Math.round(newWidth * this.verticalScale);

        canvasContainer.style.setProperty("height", `${newHeight}px`);

        App.rootContainer.scale = newHorizontalScale;

        if (App.canvas.width !== newWidth || App.canvas.height !== newHeight) {
            App.resize();
        }
    };
}
