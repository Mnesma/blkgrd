import "./index.css";
import { Render } from "matter-js";
import { App } from "./components/app";
import { Bundles } from "./components/bundles";
import { CanvasDecorations } from "./components/canvas-decorations";
import { CanvasSizeManager } from "./components/canvas-size-manager";
import { Guild } from "./components/guild";
import { Physics } from "./components/physics";
import { Rooms } from "./components/rooms";
import { manifest } from "./manifest";

(async () => {
    await Bundles.load();

    await App.init();

    CanvasSizeManager.start();

    App.show(CanvasDecorations.background);

    const aboveWaterRoom = Rooms.aboveWater;
    App.show(aboveWaterRoom.root);
    App.addStaticBodies(aboveWaterRoom.bodies);

    const belowWaterRoom = Rooms.belowWater;
    App.show(belowWaterRoom.root);
    App.addStaticBodies(belowWaterRoom.bodies);

    Guild.loadMembers();

    App.show(Guild.membersContainer);
    App.addActors(Guild.members);

    App.show(CanvasDecorations.foreground);

    App.start();

    if (manifest.debugging) {
        const render = Render.create({
            element: document.body,
            engine: Physics.engine,
            options: {
                width: App.canvas.width,
                height: App.canvas.height,
                showDebug: true,
                showPositions: true,
                showAngleIndicator: true,
                wireframes: false
            }
        });
        Render.run(render);
    }
})();
