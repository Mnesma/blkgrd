import { Vector2 } from "./components/new/vector2";
import { AssetKey } from "./enums/asset-key";
import { BundleKey } from "./enums/bundle-key";
import { TubeType } from "./enums/tube-type";
import {
    blueTube,
    cakeSwimming,
    cakeTubing,
    fish1,
    fish1Blurred,
    fish2,
    fish2Blurred,
    fish3,
    fish3Blurred,
    fishSchool1,
    fishSchool2,
    fishSchool3,
    flamingoTube,
    floatletTube,
    mnesmaSwimming,
    mnesmaTubing,
    petalFallsBackground,
    pool,
    poolWater,
    redTube,
    sinkEffect,
    slideLeftBackground,
    slideRightBackground,
    splashEffect,
    surfaceEffect,
    trayTube,
    tubeletTube,
    underWaterGodRay,
    underWaterParticles,
    waterEdge,
    waterfall
} from "./image-imports";
import type { Manifest } from "./types/manifest-types";

export const manifest: Manifest = {
    pixiManifest: {
        bundles: [
            {
                name: BundleKey.Pool,
                assets: [
                    {
                        alias: AssetKey.PoolBackground,
                        src: pool.poolBackgroundUrl
                    },
                    {
                        alias: AssetKey.SlideForeground,
                        src: pool.slideForegroundUrl
                    },
                    {
                        alias: AssetKey.SlideTowerBase,
                        src: pool.slideTowerBaseUrl
                    },
                    {
                        alias: AssetKey.SlideTowerTop,
                        src: pool.slideTowerTopUrl
                    },
                    {
                        alias: AssetKey.UnderWaterBackground,
                        src: pool.underWaterBackgroundUrl
                    },
                    {
                        alias: AssetKey.UnderWaterMidground,
                        src: pool.underWaterMidgroundUrl
                    },
                    {
                        alias: AssetKey.UnderWaterForeground,
                        src: pool.underWaterForegroundUrl
                    },
                    {
                        alias: AssetKey.UnderWaterSand,
                        src: pool.underWaterSandUrl
                    }
                ]
            },
            {
                name: BundleKey.Waterfall,
                assets: Object.values(waterfall).map((src, frame) => ({
                    alias: `${BundleKey.Waterfall}${frame}`,
                    src
                }))
            },
            {
                name: BundleKey.SlideLeftBackground,
                assets: Object.values(slideLeftBackground).map((
                    src,
                    frame
                ) => ({
                    alias: `${BundleKey.SlideLeftBackground}${frame}`,
                    src
                }))
            },
            {
                name: BundleKey.SlideRightBackground,
                assets: Object.values(slideRightBackground).map((
                    src,
                    frame
                ) => ({
                    alias: `${BundleKey.SlideRightBackground}${frame}`,
                    src
                }))
            },
            {
                name: BundleKey.PoolWater,
                assets: Object.values(poolWater).map((src, frame) => ({
                    alias: `${BundleKey.PoolWater}${frame}`,
                    src
                }))
            },
            {
                name: BundleKey.WaterEdge,
                assets: Object.values(waterEdge).map((src, frame) => ({
                    alias: `${BundleKey.WaterEdge}${frame}`,
                    src
                }))
            },
            {
                name: BundleKey.BlueTube,
                assets: Object.values(blueTube).map((src, frame) => ({
                    alias: `${BundleKey.BlueTube}${frame}`,
                    src
                }))
            },
            {
                name: BundleKey.RedTube,
                assets: Object.values(redTube).map((src, frame) => ({
                    alias: `${BundleKey.RedTube}${frame}`,
                    src
                }))
            },
            {
                name: BundleKey.FlamingoTube,
                assets: Object.values(flamingoTube).map((src, frame) => ({
                    alias: `${BundleKey.FlamingoTube}${frame}`,
                    src
                }))
            },
            {
                name: BundleKey.TrayTube,
                assets: Object.values(trayTube).map((src, frame) => ({
                    alias: `${BundleKey.TrayTube}${frame}`,
                    src
                }))
            },
            {
                name: BundleKey.TubeletTube,
                assets: Object.values(tubeletTube).map((src, frame) => ({
                    alias: `${BundleKey.TubeletTube}${frame}`,
                    src
                }))
            },
            {
                name: BundleKey.FloatletTube,
                assets: Object.values(floatletTube).map((src, frame) => ({
                    alias: `${BundleKey.FloatletTube}${frame}`,
                    src
                }))
            },
            {
                name: BundleKey.MnesmaTubing,
                assets: Object.values(mnesmaTubing).map((src, frame) => ({
                    alias: `${BundleKey.MnesmaTubing}${frame}`,
                    src
                }))
            },
            {
                name: BundleKey.MnesmaSwimming,
                assets: Object.values(mnesmaSwimming).map((src, frame) => ({
                    alias: `${BundleKey.MnesmaSwimming}${frame}`,
                    src
                }))
            },
            {
                name: BundleKey.PetalFallsBackground,
                assets: Object.values(petalFallsBackground).map((
                    src,
                    frame
                ) => ({
                    alias: `${BundleKey.PetalFallsBackground}${frame}`,
                    src
                }))
            },
            {
                name: BundleKey.CakeTubing,
                assets: Object.values(cakeTubing).map((src, frame) => ({
                    alias: `${BundleKey.CakeTubing}${frame}`,
                    src
                }))
            },
            {
                name: BundleKey.CakeSwimming,
                assets: Object.values(cakeSwimming).map((src, frame) => ({
                    alias: `${BundleKey.CakeSwimming}${frame}`,
                    src
                }))
            },
            {
                name: BundleKey.SplashEffect,
                assets: Object.values(splashEffect).map((src, frame) => ({
                    alias: `${BundleKey.SplashEffect}${frame}`,
                    src
                }))
            },
            {
                name: BundleKey.SinkEffect,
                assets: Object.values(sinkEffect).map((src, frame) => ({
                    alias: `${BundleKey.SinkEffect}${frame}`,
                    src
                }))
            },
            {
                name: BundleKey.SurfaceEffect,
                assets: Object.values(surfaceEffect).map((src, frame) => ({
                    alias: `${BundleKey.SurfaceEffect}${frame}`,
                    src
                }))
            },
            {
                name: BundleKey.UnderWaterGodRay,
                assets: [
                    {
                        alias: AssetKey.UnderWaterGodRay0,
                        src: underWaterGodRay.underWaterGodRay0
                    },
                    {
                        alias: AssetKey.UnderWaterGodRay1,
                        src: underWaterGodRay.underWaterGodRay1
                    }
                ]
            },
            {
                name: BundleKey.UnderWaterParticles,
                assets: Object.values(underWaterParticles).map((
                    src,
                    frame
                ) => ({
                    alias: `${BundleKey.UnderWaterParticles}${frame}`,
                    src
                }))
            },
            {
                name: BundleKey.Fish1,
                assets: Object.values(fish1).map((src, frame) => ({
                    alias: `${BundleKey.Fish1}_${frame}`,
                    src
                }))
            },
            {
                name: BundleKey.Fish1Blurred,
                assets: Object.values(fish1Blurred).map((src, frame) => ({
                    alias: `${BundleKey.Fish1Blurred}${frame}`,
                    src
                }))
            },
            {
                name: BundleKey.Fish2,
                assets: Object.values(fish2).map((src, frame) => ({
                    alias: `${BundleKey.Fish2}_${frame}`,
                    src
                }))
            },
            {
                name: BundleKey.Fish2Blurred,
                assets: Object.values(fish2Blurred).map((src, frame) => ({
                    alias: `${BundleKey.Fish2Blurred}${frame}`,
                    src
                }))
            },
            {
                name: BundleKey.Fish3,
                assets: Object.values(fish3).map((src, frame) => ({
                    alias: `${BundleKey.Fish3}_${frame}`,
                    src
                }))
            },
            {
                name: BundleKey.Fish3Blurred,
                assets: Object.values(fish3Blurred).map((src, frame) => ({
                    alias: `${BundleKey.Fish3Blurred}${frame}`,
                    src
                }))
            },
            {
                name: BundleKey.FishSchool1,
                assets: Object.values(fishSchool1).map((src, frame) => ({
                    alias: `${BundleKey.FishSchool1}_${frame}`,
                    src
                }))
            },
            {
                name: BundleKey.FishSchool2,
                assets: Object.values(fishSchool2).map((src, frame) => ({
                    alias: `${BundleKey.FishSchool2}_${frame}`,
                    src
                }))
            },
            {
                name: BundleKey.FishSchool3,
                assets: Object.values(fishSchool3).map((src, frame) => ({
                    alias: `${BundleKey.FishSchool3}_${frame}`,
                    src
                }))
            }
        ]
    },
    details: {
        waterEdgePositions: [
            [-300, 840],
            [200, 840],
            [700, 840],
            [1100, 840]
        ],
        tubes: {
            [TubeType.Red]: {
                name: TubeType.Red,
                bundleKey: BundleKey.RedTube,
                boundsOffset: new Vector2(0, -4),
                boundsDimensions: new Vector2(88, 28),
                mass: 2.464
            },
            [TubeType.Blue]: {
                name: TubeType.Blue,
                bundleKey: BundleKey.BlueTube,
                boundsOffset: new Vector2(0, -4),
                boundsDimensions: new Vector2(88, 28),
                mass: 2.464
            },
            [TubeType.Tubelet]: {
                name: TubeType.Tubelet,
                bundleKey: BundleKey.TubeletTube,
                boundsOffset: new Vector2(0, -4),
                boundsDimensions: new Vector2(88, 28),
                mass: 2.464
            },
            [TubeType.Floatlet]: {
                name: TubeType.Floatlet,
                bundleKey: BundleKey.FloatletTube,
                boundsOffset: new Vector2(2, 18),
                boundsDimensions: new Vector2(120, 31),
                mass: 3.72
            },
            [TubeType.Tray]: {
                name: TubeType.Tray,
                bundleKey: BundleKey.TrayTube,
                boundsOffset: new Vector2(0, 8),
                boundsDimensions: new Vector2(155, 42),
                mass: 6.51
            },
            [TubeType.Flamingo]: {
                name: TubeType.Flamingo,
                bundleKey: BundleKey.FlamingoTube,
                boundsOffset: new Vector2(8, 24),
                boundsDimensions: new Vector2(88, 28),
                mass: 2.464
            }
        },
        guildMembers: [
            {
                name: "Mnesma",
                animations: {
                    tubing: {
                        name: BundleKey.MnesmaTubing,
                        offset: [8, -33],
                        backgroundOffset: [14, -34]
                    },
                    swimming: {
                        name: BundleKey.MnesmaSwimming,
                        offset: [10, -15],
                        backgroundOffset: [14, 0]
                    }
                },
                background: BundleKey.PetalFallsBackground,
                swimmingBodySize: [44, 74],
                tubeType: TubeType.Floatlet
            },
            {
                name: "CalsuuCake",
                animations: {
                    tubing: {
                        name: BundleKey.CakeTubing,
                        offset: [8, -33]
                    },
                    swimming: {
                        name: BundleKey.CakeSwimming,
                        offset: [0, 0]
                    }
                },
                swimmingBodySize: [46, 78],
                tubeType: TubeType.Red
            },
            {
                name: "Axis",
                isZeroAlpha: true,
                animations: {
                    tubing: {
                        name: BundleKey.MnesmaTubing,
                        offset: [8, -33],
                        backgroundOffset: [14, -34]
                    },
                    swimming: {
                        name: BundleKey.MnesmaSwimming,
                        offset: [10, -15],
                        backgroundOffset: [14, 0]
                    }
                },
                background: BundleKey.PetalFallsBackground,
                swimmingBodySize: [44, 74],
                tubeType: TubeType.Red
            },
            {
                name: "Axis",
                isZeroBeta: true,
                animations: {
                    tubing: {
                        name: BundleKey.MnesmaTubing,
                        offset: [8, -33],
                        backgroundOffset: [14, -34]
                    },
                    swimming: {
                        name: BundleKey.MnesmaSwimming,
                        offset: [10, -15],
                        backgroundOffset: [14, 0]
                    }
                },
                background: BundleKey.PetalFallsBackground,
                swimmingBodySize: [44, 74],
                tubeType: TubeType.Blue
            }
        ]
    },
    debugging: true
};
