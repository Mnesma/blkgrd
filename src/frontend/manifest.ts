import { AssetKey } from "./enums/asset-key";
import { BossName } from "./enums/boss-name";
import { BundleKey } from "./enums/bundle-key";
import { TubeType } from "./enums/tube-type";
import {
    artoriiSwimming,
    artoriiTubing,
    bibanboSwimming,
    bibanboTubing,
    birchmereSwimming,
    birchmereTubing,
    blaedeworksSwimming,
    blaedeworksTubing,
    blahreSwimming,
    blahreTubing,
    bluespace123Swimming,
    bluespace123Tubing,
    blueTube,
    bossIcons,
    cakeSwimming,
    cakeTubing,
    chessThingy,
    chowdSwimming,
    chowdTubing,
    cialleSwimming,
    cialleTubing,
    circleThingy,
    cosmicssSwimming,
    cosmicssTubing,
    d3SpiritBombSwimming,
    d3SpiritBombTubing,
    deckardkSwimming,
    deckardkTubing,
    dorchaSwimming,
    dorchaTubing,
    eicaSwimming,
    eicaTubing,
    eigenAlphaSwimming,
    eigenAlphaTubing,
    eigenBetaSwimming,
    eigenBetaTubing,
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
    floorThingy,
    g59suicideSwimming,
    g59suicideTubing,
    grahnyeSwimming,
    grahnyeTubing,
    gtischillinSwimming,
    gtischillinTubing,
    ikicktoddlerSwimming,
    ikicktoddlerTubing,
    israyaSwimming,
    israyaTubing,
    jaytsukikoSwimming,
    jaytsukikoTubing,
    katgenesisSwimming,
    katgenesisTubing,
    klerplunkSwimming,
    klerplunkTubing,
    lumialSwimming,
    lumialTubing,
    majorbriggsSwimming,
    majorbriggsTubing,
    meeepknightSwimming,
    meeepknightTubing,
    mistifistiSwimming,
    mistifistiTubing,
    mnesmaSwimming,
    mnesmaTubing,
    monkey,
    monsoonableSwimming,
    monsoonableTubing,
    neonSignThingy,
    nicoSwimming,
    nicoTubing,
    nioletPose1,
    nioletPose2,
    nioletPose3,
    petalFallsBackground,
    pool,
    poolWater,
    prohibitumSwimming,
    prohibitumTubing,
    quiversSwimming,
    quiversTubing,
    raOnDutySwimming,
    raOnDutyTubing,
    rcklsSwimming,
    rcklsTubing,
    reaper,
    redSailsSwimming,
    redSailsTubing,
    redTube,
    relricSwimming,
    relricTubing,
    seimuSwimming,
    seimuTubing,
    sinkEffect,
    slaintsigusSwimming,
    slaintsigusTubing,
    slideLeftBackground,
    slideRightBackground,
    splashEffect,
    starThingy,
    stickWackDedSwimming,
    stickWackDedTubing,
    stridSwimming,
    stridTubing,
    surfaceEffect,
    swaggerxSwimming,
    swaggerxTubing,
    syrenthSwimming,
    syrenthTubing,
    toothpickinSwimming,
    toothpickinTubing,
    trayTube,
    tricksterSwimming,
    tricksterTubing,
    tubeletTube,
    underWaterGodRay,
    underWaterParticles,
    uspyrSwimming,
    uspyrTubing,
    utensilThingy,
    vipernoxusSwimming,
    vipernoxusTubing,
    waterEdge,
    waterfall,
    whyndSwimming,
    whyndTubing,
    wingThingy,
    yagarinSwimming,
    yagarinTubing,
    zeroagencyAlphaSwimming,
    zeroagencyAlphaTubing,
    zeroagencyBetaSwimming,
    zeroagencyBetaTubing
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
                name: BundleKey.BossIcons,
                assets: Object.entries(bossIcons).map(([alias, src]) => ({
                    alias,
                    src
                }))
            },
            {
                name: BundleKey.CircleThingy,
                assets: Object.values(circleThingy).map((src, frame) => ({
                    alias: `${BundleKey.CircleThingy}${frame}`,
                    src
                }))
            },
            {
                name: BundleKey.FloorThingy,
                assets: Object.values(floorThingy).map((src, frame) => ({
                    alias: `${BundleKey.FloorThingy}${frame}`,
                    src
                }))
            },
            {
                name: BundleKey.ChessThingy,
                assets: Object.values(chessThingy).map((src, frame) => ({
                    alias: `${BundleKey.ChessThingy}${frame}`,
                    src
                }))
            },
            {
                name: BundleKey.NeonSignThingy,
                assets: Object.values(neonSignThingy).map((src, frame) => ({
                    alias: `${BundleKey.NeonSignThingy}${frame}`,
                    src
                }))
            },
            {
                name: BundleKey.StarThingy,
                assets: Object.values(starThingy).map((src, frame) => ({
                    alias: `${BundleKey.StarThingy}${frame}`,
                    src
                }))
            },
            {
                name: BundleKey.UtensilThingy,
                assets: Object.values(utensilThingy).map((src, frame) => ({
                    alias: `${BundleKey.UtensilThingy}${frame}`,
                    src
                }))
            },
            {
                name: BundleKey.WingThingy,
                assets: Object.values(wingThingy).map((src, frame) => ({
                    alias: `${BundleKey.WingThingy}${frame}`,
                    src
                }))
            },
            {
                name: BundleKey.Niolet1,
                assets: Object.values(nioletPose1).map((src, frame) => ({
                    alias: `${BundleKey.Niolet1}${frame}`,
                    src
                }))
            },
            {
                name: BundleKey.Niolet2,
                assets: Object.values(nioletPose2).map((src, frame) => ({
                    alias: `${BundleKey.Niolet2}${frame}`,
                    src
                }))
            },
            {
                name: BundleKey.Niolet3,
                assets: Object.values(nioletPose3).map((src, frame) => ({
                    alias: `${BundleKey.Niolet3}${frame}`,
                    src
                }))
            },
            {
                name: BundleKey.Reaper,
                assets: Object.values(reaper).map((src, frame) => ({
                    alias: `${BundleKey.Reaper}${frame}`,
                    src
                }))
            },
            {
                name: BundleKey.Monkey,
                assets: Object.values(monkey).map((src, frame) => ({
                    alias: `${BundleKey.Monkey}${frame}`,
                    src
                }))
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
            },
            ...([
                [BundleKey.MnesmaTubing, mnesmaTubing],
                [BundleKey.MnesmaSwimming, mnesmaSwimming],
                [BundleKey.CakeTubing, cakeTubing],
                [BundleKey.CakeSwimming, cakeSwimming],
                [BundleKey.RedSailsTubing, redSailsTubing],
                [BundleKey.RedSailsSwimming, redSailsSwimming],
                [BundleKey.BlahreTubing, blahreTubing],
                [BundleKey.BlahreSwimming, blahreSwimming],
                [BundleKey.StickWackDedTubing, stickWackDedTubing],
                [BundleKey.StickWackDedSwimming, stickWackDedSwimming],
                [BundleKey.NicoTubing, nicoTubing],
                [BundleKey.NicoSwimming, nicoSwimming],
                [BundleKey.RelricTubing, relricTubing],
                [BundleKey.RelricSwimming, relricSwimming],
                [BundleKey.MonsoonableTubing, monsoonableTubing],
                [BundleKey.MonsoonableSwimming, monsoonableSwimming],
                [BundleKey.LumialTubing, lumialTubing],
                [BundleKey.LumialSwimming, lumialSwimming],
                [BundleKey.BibanboTubing, bibanboTubing],
                [BundleKey.BibanboSwimming, bibanboSwimming],
                [BundleKey.WhyndTubing, whyndTubing],
                [BundleKey.WhyndSwimming, whyndSwimming],
                [BundleKey.Bluespace123Tubing, bluespace123Tubing],
                [BundleKey.Bluespace123Swimming, bluespace123Swimming],
                [BundleKey.D3SpiritBombTubing, d3SpiritBombTubing],
                [BundleKey.D3SpiritBombSwimming, d3SpiritBombSwimming],
                [BundleKey.RAonDutyTubing, raOnDutyTubing],
                [BundleKey.RAonDutySwimming, raOnDutySwimming],
                [BundleKey.BlaedeworksTubing, blaedeworksTubing],
                [BundleKey.BlaedeworksSwimming, blaedeworksSwimming],
                [BundleKey.MeeepKnightTubing, meeepknightTubing],
                [BundleKey.MeeepKnightSwimming, meeepknightSwimming],
                [BundleKey.KlerplunkTubing, klerplunkTubing],
                [BundleKey.KlerplunkSwimming, klerplunkSwimming],
                [BundleKey.DeckardKTubing, deckardkTubing],
                [BundleKey.DeckardKSwimming, deckardkSwimming],
                [BundleKey.SeimuTubing, seimuTubing],
                [BundleKey.SeimuSwimming, seimuSwimming],
                [BundleKey.CialleTubing, cialleTubing],
                [BundleKey.CialleSwimming, cialleSwimming],
                [BundleKey.GtischillinTubing, gtischillinTubing],
                [BundleKey.GtischillinSwimming, gtischillinSwimming],
                [BundleKey.ArtoriiTubing, artoriiTubing],
                [BundleKey.ArtoriiSwimming, artoriiSwimming],
                [BundleKey.CosmicSSTubing, cosmicssTubing],
                [BundleKey.CosmicSSSwimming, cosmicssSwimming],
                [BundleKey.ChowdTubing, chowdTubing],
                [BundleKey.ChowdSwimming, chowdSwimming],
                [BundleKey.SlaintSigusTubing, slaintsigusTubing],
                [BundleKey.SlaintSigusSwimming, slaintsigusSwimming],
                [BundleKey.JayTsukikoTubing, jaytsukikoTubing],
                [BundleKey.JayTsukikoSwimming, jaytsukikoSwimming],
                [BundleKey.TricksterTubing, tricksterTubing],
                [BundleKey.TricksterSwimming, tricksterSwimming],
                [BundleKey.MistifistiTubing, mistifistiTubing],
                [BundleKey.MistifistiSwimming, mistifistiSwimming],
                [BundleKey.StridTubing, stridTubing],
                [BundleKey.StridSwimming, stridSwimming],
                [BundleKey.MajorBriggsTubing, majorbriggsTubing],
                [BundleKey.MajorBriggsSwimming, majorbriggsSwimming],
                [BundleKey.IkicktoddlerTubing, ikicktoddlerTubing],
                [BundleKey.IkicktoddlerSwimming, ikicktoddlerSwimming],
                [BundleKey.ToothpickinTubing, toothpickinTubing],
                [BundleKey.ToothpickinSwimming, toothpickinSwimming],
                [BundleKey.QuiversTubing, quiversTubing],
                [BundleKey.QuiversSwimming, quiversSwimming],
                [BundleKey.SwaggerxTubing, swaggerxTubing],
                [BundleKey.SwaggerxSwimming, swaggerxSwimming],
                [BundleKey.RcklsTubing, rcklsTubing],
                [BundleKey.RcklsSwimming, rcklsSwimming],
                [BundleKey.BirchmereTubing, birchmereTubing],
                [BundleKey.BirchmereSwimming, birchmereSwimming],
                [BundleKey.YagarinTubing, yagarinTubing],
                [BundleKey.YagarinSwimming, yagarinSwimming],
                [BundleKey.ZeroAgencyAlphaTubing, zeroagencyAlphaTubing],
                [BundleKey.ZeroAgencyAlphaSwimming, zeroagencyAlphaSwimming],
                [BundleKey.ZeroAgencyBetaTubing, zeroagencyBetaTubing],
                [BundleKey.ZeroAgencyBetaSwimming, zeroagencyBetaSwimming],
                [BundleKey.EigenAlphaTubing, eigenAlphaTubing],
                [BundleKey.EigenAlphaSwimming, eigenAlphaSwimming],
                [BundleKey.EigenBetaTubing, eigenBetaTubing],
                [BundleKey.EigenBetaSwimming, eigenBetaSwimming],
                [BundleKey.KatgenesisTubing, katgenesisTubing],
                [BundleKey.KatgenesisSwimming, katgenesisSwimming],
                [BundleKey.IsrayaTubing, israyaTubing],
                [BundleKey.IsrayaSwimming, israyaSwimming],
                [BundleKey.SyrenthTubing, syrenthTubing],
                [BundleKey.SyrenthSwimming, syrenthSwimming],
                [BundleKey.G59SuicideTubing, g59suicideTubing],
                [BundleKey.G59SuicideSwimming, g59suicideSwimming],
                [BundleKey.UspyrTubing, uspyrTubing],
                [BundleKey.UspyrSwimming, uspyrSwimming],
                [BundleKey.ProhibitumTubing, prohibitumTubing],
                [BundleKey.ProhibitumSwimming, prohibitumSwimming],
                [BundleKey.ViperNoxusTubing, vipernoxusTubing],
                [BundleKey.ViperNoxusSwimming, vipernoxusSwimming],
                [BundleKey.DorchaTubing, dorchaTubing],
                [BundleKey.DorchaSwimming, dorchaSwimming],
                [BundleKey.GrahnyeTubing, grahnyeTubing],
                [BundleKey.GrahnyeSwimming, grahnyeSwimming],
                [BundleKey.EicaTubing, eicaTubing],
                [BundleKey.EicaSwimming, eicaSwimming]
            ] as [BundleKey, object][]).map(([name, asset]) => ({
                name,
                assets: Object.values(asset).map((src, frame) => ({
                    alias: `${name}${frame}`,
                    src
                }))
            }))
        ]
    },
    details: {
        waterEdgePositions: [
            [-300, 840],
            [200, 840],
            [700, 840],
            [1100, 840]
        ],
        guildMembers: [
            {
                name: "Mnesma",
                animations: {
                    tubing: {
                        name: BundleKey.MnesmaTubing,
                        offset: [8, -33],
                        backgroundOffset: [14, -35]
                    },
                    swimming: {
                        name: BundleKey.MnesmaSwimming,
                        offset: [0, -16],
                        backgroundOffset: [14, 0]
                    }
                },
                bestSolo: BossName.HBlackMage,
                background: BundleKey.PetalFallsBackground,
                swimmingBodySize: [40, 74],
                tubeType: TubeType.Floatlet
            },
            {
                name: "Seimu",
                animations: {
                    tubing: {
                        name: BundleKey.SeimuTubing,
                        offset: [2, -33]
                    },
                    swimming: {
                        name: BundleKey.SeimuSwimming,
                        offset: [0, -3]
                    }
                },
                bestSolo: BossName.HSeren,
                swimmingBodySize: [25, 74],
                tubeType: TubeType.Floatlet
            },
            {
                name: "SlaintSigus",
                animations: {
                    tubing: {
                        name: BundleKey.SlaintSigusTubing,
                        offset: [15, -43]
                    },
                    swimming: {
                        name: BundleKey.SlaintSigusSwimming,
                        offset: [0, -2]
                    }
                },
                bestSolo: BossName.EKaling,
                swimmingBodySize: [35, 74],
                tubeType: TubeType.Tray
            },
            {
                name: "Grahnye",
                animations: {
                    tubing: {
                        name: BundleKey.GrahnyeTubing,
                        offset: [15, -48]
                    },
                    swimming: {
                        name: BundleKey.GrahnyeSwimming,
                        offset: [-2, -9]
                    }
                },
                bestSolo: BossName.HSeren,
                swimmingBodySize: [35, 74],
                tubeType: TubeType.Tray,
                pet: {
                    key: BundleKey.Reaper,
                    swimmingOffset: [30, 0],
                    tubingOffset: [20, -20]
                }
            },
            {
                name: "Prohibitum",
                animations: {
                    tubing: {
                        name: BundleKey.ProhibitumTubing,
                        offset: [15, -48],
                        backgroundOffset: [18, -78]
                    },
                    swimming: {
                        name: BundleKey.ProhibitumSwimming,
                        offset: [10, -5],
                        backgroundOffset: [-2, -50]
                    }
                },
                bestSolo: BossName.NSlime,
                swimmingBodySize: [35, 74],
                background: BundleKey.UtensilThingy,
                tubeType: TubeType.Tray
            },
            {
                name: "Katgenesis",
                animations: {
                    tubing: {
                        name: BundleKey.KatgenesisTubing,
                        offset: [15, -50],
                        backgroundOffset: [20, -58]
                    },
                    swimming: {
                        name: BundleKey.KatgenesisSwimming,
                        offset: [-30, -7],
                        backgroundOffset: [0, -36]
                    }
                },
                background: BundleKey.ChessThingy,
                bestSolo: BossName.HLotus,
                swimmingBodySize: [35, 74],
                tubeType: TubeType.Tray
            },
            {
                name: "Whynd",
                animations: {
                    tubing: {
                        name: BundleKey.WhyndTubing,
                        offset: [8, -32]
                    },
                    swimming: {
                        name: BundleKey.WhyndSwimming,
                        offset: [15, -1]
                    }
                },
                bestSolo: BossName.HSeren,
                swimmingBodySize: [56, 74],
                tubeType: TubeType.Tubelet
            },
            {
                name: "Dorcha",
                animations: {
                    tubing: {
                        name: BundleKey.DorchaTubing,
                        offset: [8, -35],
                        backgroundOffset: [0, 0]
                    },
                    swimming: {
                        name: BundleKey.DorchaSwimming,
                        offset: [-2, -8],
                        backgroundOffset: [0, 22]
                    }
                },
                bestSolo: BossName.HDarknell,
                swimmingBodySize: [56, 74],
                background: BundleKey.FloorThingy,
                tubeType: TubeType.Tubelet
            },
            {
                name: "Israya",
                animations: {
                    tubing: {
                        name: BundleKey.IsrayaTubing,
                        offset: [8, -36],
                        backgroundOffset: [10, -20]
                    },
                    swimming: {
                        name: BundleKey.IsrayaSwimming,
                        offset: [2, -8],
                        backgroundOffset: [0, -10]
                    }
                },
                bestSolo: BossName.HLucid,
                swimmingBodySize: [40, 74],
                background: BundleKey.StarThingy,
                tubeType: TubeType.Tubelet
            },
            {
                name: "Trickster",
                animations: {
                    tubing: {
                        name: BundleKey.TricksterTubing,
                        offset: [12, -32]
                    },
                    swimming: {
                        name: BundleKey.TricksterSwimming,
                        offset: [10, 3]
                    }
                },
                bestSolo: BossName.CGloom,
                swimmingBodySize: [40, 74],
                tubeType: TubeType.Tubelet
            },
            {
                name: "Strid",
                animations: {
                    tubing: {
                        name: BundleKey.StridTubing,
                        offset: [8, -32]
                    },
                    swimming: {
                        name: BundleKey.StridSwimming,
                        offset: [0, -4]
                    }
                },
                bestSolo: BossName.NDarknell,
                swimmingBodySize: [40, 74],
                tubeType: TubeType.Tubelet
            },
            {
                name: "CosmicSS",
                animations: {
                    tubing: {
                        name: BundleKey.CosmicSSTubing,
                        offset: [8, -34]
                    },
                    swimming: {
                        name: BundleKey.CosmicSSSwimming,
                        offset: [0, -4]
                    }
                },
                bestSolo: BossName.CSlime,
                swimmingBodySize: [40, 74],
                tubeType: TubeType.Tubelet
            },
            {
                name: "Chowd",
                animations: {
                    tubing: {
                        name: BundleKey.ChowdTubing,
                        offset: [8, -32]
                    },
                    swimming: {
                        name: BundleKey.ChowdSwimming,
                        offset: [0, -3]
                    }
                },
                bestSolo: BossName.HSeren,
                swimmingBodySize: [40, 74],
                tubeType: TubeType.Tubelet
            },
            {
                name: "DeckardK",
                animations: {
                    tubing: {
                        name: BundleKey.DeckardKTubing,
                        offset: [8, -31]
                    },
                    swimming: {
                        name: BundleKey.DeckardKSwimming,
                        offset: [0, -2]
                    }
                },
                bestSolo: BossName.NKalos,
                swimmingBodySize: [40, 74],
                tubeType: TubeType.Tubelet
            },
            {
                name: "bluespace123",
                animations: {
                    tubing: {
                        name: BundleKey.Bluespace123Tubing,
                        offset: [7, -27]
                    },
                    swimming: {
                        name: BundleKey.Bluespace123Swimming,
                        offset: [0, -2]
                    }
                },
                bestSolo: BossName.NVHilla,
                swimmingBodySize: [44, 74],
                tubeType: TubeType.Flamingo
            },
            {
                name: "G59Suicide",
                animations: {
                    tubing: {
                        name: BundleKey.G59SuicideTubing,
                        offset: [10, -41]
                    },
                    swimming: {
                        name: BundleKey.G59SuicideSwimming,
                        offset: [-20, -9]
                    }
                },
                bestSolo: BossName.CSlime,
                swimmingBodySize: [40, 74],
                tubeType: TubeType.Flamingo
            },
            {
                name: "Syrenth",
                animations: {
                    tubing: {
                        name: BundleKey.SyrenthTubing,
                        offset: [10, -30],
                        backgroundOffset: [30, -50]
                    },
                    swimming: {
                        name: BundleKey.SyrenthSwimming,
                        offset: [-5, -16],
                        backgroundOffset: [28, -39]
                    }
                },
                bestSolo: BossName.NKalos,
                swimmingBodySize: [30, 74],
                background: BundleKey.WingThingy,
                tubeType: TubeType.Flamingo
            },
            {
                name: "Birchmere",
                animations: {
                    tubing: {
                        name: BundleKey.BirchmereTubing,
                        offset: [25, -38]
                    },
                    swimming: {
                        name: BundleKey.BirchmereSwimming,
                        offset: [0, -10]
                    }
                },
                bestSolo: BossName.HBlackMage,
                swimmingBodySize: [35, 74],
                tubeType: TubeType.Flamingo
            },
            {
                name: "Bibanbo",
                animations: {
                    tubing: {
                        name: BundleKey.BibanboTubing,
                        offset: [10, -33]
                    },
                    swimming: {
                        name: BundleKey.BibanboSwimming,
                        offset: [4, -8]
                    }
                },
                bestSolo: BossName.HBlackMage,
                swimmingBodySize: [30, 74],
                tubeType: TubeType.Flamingo
            },
            {
                name: "RedSails",
                animations: {
                    tubing: {
                        name: BundleKey.RedSailsTubing,
                        offset: [14, -33]
                    },
                    swimming: {
                        name: BundleKey.RedSailsSwimming,
                        offset: [0, -8]
                    }
                },
                bestSolo: BossName.HSeren,
                swimmingBodySize: [44, 74],
                tubeType: TubeType.Flamingo
            },
            {
                name: "Monsoonable",
                animations: {
                    tubing: {
                        name: BundleKey.MonsoonableTubing,
                        offset: [7, -26]
                    },
                    swimming: {
                        name: BundleKey.MonsoonableSwimming,
                        offset: [0, -3]
                    }
                },
                bestSolo: BossName.NGloom,
                swimmingBodySize: [40, 74],
                tubeType: TubeType.Flamingo,
                pet: {
                    key: BundleKey.Monkey,
                    swimmingOffset: [35, -20],
                    tubingOffset: [30, -30]
                }
            },
            {
                name: "3DSpiritBomb",
                animations: {
                    tubing: {
                        name: BundleKey.D3SpiritBombTubing,
                        offset: [8, -32]
                    },
                    swimming: {
                        name: BundleKey.D3SpiritBombSwimming,
                        offset: [0, -3]
                    }
                },
                bestSolo: BossName.CSlime,
                swimmingBodySize: [30, 74],
                tubeType: TubeType.Tubelet
            },
            {
                name: "Blahsters",
                animations: {
                    tubing: {
                        name: BundleKey.BlahreTubing,
                        offset: [8, -30]
                    },
                    swimming: {
                        name: BundleKey.BlahreSwimming,
                        offset: [-4, 0]
                    }
                },
                bestSolo: BossName.EKaling,
                swimmingBodySize: [45, 74],
                tubeType: TubeType.Tubelet
            },
            {
                name: "StickWackDed",
                animations: {
                    tubing: {
                        name: BundleKey.StickWackDedTubing,
                        offset: [5, -43]
                    },
                    swimming: {
                        name: BundleKey.StickWackDedSwimming,
                        offset: [-8, -15]
                    }
                },
                bestSolo: BossName.CSlime,
                swimmingBodySize: [45, 74],
                tubeType: TubeType.Tubelet
            },
            {
                name: "Nícò",
                animations: {
                    tubing: {
                        name: BundleKey.NicoTubing,
                        offset: [9, -30]
                    },
                    swimming: {
                        name: BundleKey.NicoSwimming,
                        offset: [0, 0]
                    }
                },
                bestSolo: BossName.CSlime,
                swimmingBodySize: [40, 74],
                tubeType: TubeType.Tubelet
            },
            {
                name: "Relric",
                animations: {
                    tubing: {
                        name: BundleKey.RelricTubing,
                        offset: [6, -31]
                    },
                    swimming: {
                        name: BundleKey.RelricSwimming,
                        offset: [14, -6]
                    }
                },
                bestSolo: BossName.HSeren,
                swimmingBodySize: [50, 74],
                tubeType: TubeType.Blue,
                pet: {
                    key: BundleKey.Reaper,
                    swimmingOffset: [20, 0],
                    tubingOffset: [20, -20]
                }
            },
            {
                name: "Lumial",
                animations: {
                    tubing: {
                        name: BundleKey.LumialTubing,
                        offset: [9, -40]
                    },
                    swimming: {
                        name: BundleKey.LumialSwimming,
                        offset: [33, -3]
                    }
                },
                bestSolo: BossName.HBlackMage,
                swimmingBodySize: [30, 74],
                tubeType: TubeType.Red,
                pet: {
                    key: BundleKey.Reaper,
                    swimmingOffset: [50, 0],
                    tubingOffset: [20, -20]
                }
            },
            {
                name: "meeepKnight",
                animations: {
                    tubing: {
                        name: BundleKey.MeeepKnightTubing,
                        offset: [11, -46]
                    },
                    swimming: {
                        name: BundleKey.MeeepKnightSwimming,
                        offset: [10, -17]
                    }
                },
                bestSolo: BossName.Urchin,
                swimmingBodySize: [40, 74],
                tubeType: TubeType.Red
            },
            {
                name: "Uspyr",
                animations: {
                    tubing: {
                        name: BundleKey.UspyrTubing,
                        offset: [9, -35],
                        backgroundOffset: [10, -25]
                    },
                    swimming: {
                        name: BundleKey.UspyrSwimming,
                        offset: [18, -10],
                        backgroundOffset: [0, -10]
                    }
                },
                bestSolo: BossName.NWill,
                swimmingBodySize: [40, 74],
                background: BundleKey.CircleThingy,
                tubeType: TubeType.Red
            },
            {
                name: "Artorii",
                animations: {
                    tubing: {
                        name: BundleKey.ArtoriiTubing,
                        offset: [9, -30]
                    },
                    swimming: {
                        name: BundleKey.ArtoriiSwimming,
                        offset: [0, -2]
                    }
                },
                bestSolo: BossName.EKaling,
                swimmingBodySize: [40, 74],
                tubeType: TubeType.Red
            },
            {
                name: "Mistifisti",
                animations: {
                    tubing: {
                        name: BundleKey.MistifistiTubing,
                        offset: [7, -35]
                    },
                    swimming: {
                        name: BundleKey.MistifistiSwimming,
                        offset: [0, -8]
                    }
                },
                bestSolo: BossName.Urchin,
                swimmingBodySize: [40, 74],
                tubeType: TubeType.Blue
            },
            {
                name: "JayTsukiko",
                animations: {
                    tubing: {
                        name: BundleKey.JayTsukikoTubing,
                        offset: [7, -30]
                    },
                    swimming: {
                        name: BundleKey.JayTsukikoSwimming,
                        offset: [10, 0]
                    }
                },
                bestSolo: BossName.HBlackMage,
                swimmingBodySize: [40, 74],
                tubeType: TubeType.Blue
            },
            {
                name: "Rckls",
                animations: {
                    tubing: {
                        name: BundleKey.RcklsTubing,
                        offset: [5, -32]
                    },
                    swimming: {
                        name: BundleKey.RcklsSwimming,
                        offset: [0, -4]
                    }
                },
                bestSolo: BossName.HSeren,
                swimmingBodySize: [40, 74],
                tubeType: TubeType.Blue
            },
            {
                name: "MajorBriggs",
                animations: {
                    tubing: {
                        name: BundleKey.MajorBriggsTubing,
                        offset: [6, -32]
                    },
                    swimming: {
                        name: BundleKey.MajorBriggsSwimming,
                        offset: [10, -3]
                    }
                },
                bestSolo: BossName.CSlime,
                swimmingBodySize: [40, 74],
                tubeType: TubeType.Blue
            },
            {
                name: "Quïvers",
                animations: {
                    tubing: {
                        name: BundleKey.QuiversTubing,
                        offset: [8, -30]
                    },
                    swimming: {
                        name: BundleKey.QuiversSwimming,
                        offset: [20, -23]
                    }
                },
                bestSolo: BossName.Urchin,
                swimmingBodySize: [40, 74],
                tubeType: TubeType.Blue
            },
            {
                name: "Klerplunk",
                animations: {
                    tubing: {
                        name: BundleKey.KlerplunkTubing,
                        offset: [4, -28]
                    },
                    swimming: {
                        name: BundleKey.KlerplunkSwimming,
                        offset: [10, 0]
                    }
                },
                bestSolo: BossName.NWill,
                swimmingBodySize: [40, 74],
                tubeType: TubeType.Blue
            },
            {
                name: "gtischillin",
                animations: {
                    tubing: {
                        name: BundleKey.GtischillinTubing,
                        offset: [10, -33]
                    },
                    swimming: {
                        name: BundleKey.GtischillinSwimming,
                        offset: [2, -2]
                    }
                },
                bestSolo: BossName.CSlime,
                swimmingBodySize: [50, 74],
                tubeType: TubeType.Blue
            },
            {
                name: "Cialle",
                animations: {
                    tubing: {
                        name: BundleKey.CialleTubing,
                        offset: [10, -32]
                    },
                    swimming: {
                        name: BundleKey.CialleSwimming,
                        offset: [0, -3]
                    }
                },
                bestSolo: BossName.HBlackMage,
                swimmingBodySize: [50, 74],
                tubeType: TubeType.Blue
            },
            {
                name: "IKICKTODDLER",
                animations: {
                    tubing: {
                        name: BundleKey.IkicktoddlerTubing,
                        offset: [8, -32]
                    },
                    swimming: {
                        name: BundleKey.IkicktoddlerSwimming,
                        offset: [0, -2]
                    }
                },
                bestSolo: BossName.HLotus,
                swimmingBodySize: [44, 74],
                tubeType: TubeType.Tubelet
            },
            {
                name: "toothpickin",
                animations: {
                    tubing: {
                        name: BundleKey.ToothpickinTubing,
                        offset: [8, -32]
                    },
                    swimming: {
                        name: BundleKey.ToothpickinSwimming,
                        offset: [0, -3]
                    }
                },
                bestSolo: BossName.NLucid,
                swimmingBodySize: [44, 74],
                tubeType: TubeType.Tubelet
            },
            {
                name: "yagarin",
                animations: {
                    tubing: {
                        name: BundleKey.YagarinTubing,
                        offset: [8, -32]
                    },
                    swimming: {
                        name: BundleKey.YagarinSwimming,
                        offset: [0, -3]
                    }
                },
                bestSolo: BossName.CSlime,
                swimmingBodySize: [44, 74],
                tubeType: TubeType.Tubelet
            },
            {
                name: "swaggerx",
                animations: {
                    tubing: {
                        name: BundleKey.SwaggerxTubing,
                        offset: [8, -32]
                    },
                    swimming: {
                        name: BundleKey.SwaggerxSwimming,
                        offset: [0, -3]
                    }
                },
                bestSolo: BossName.NLucid,
                swimmingBodySize: [44, 74],
                tubeType: TubeType.Tubelet
            },
            {
                name: "RAonDuty",
                animations: {
                    tubing: {
                        name: BundleKey.RAonDutyTubing,
                        offset: [8, -32]
                    },
                    swimming: {
                        name: BundleKey.RAonDutySwimming,
                        offset: [11, -2]
                    }
                },
                bestSolo: BossName.HBlackMage,
                swimmingBodySize: [30, 74],
                tubeType: TubeType.Tubelet
            },
            {
                name: "Blaedeworks",
                animations: {
                    tubing: {
                        name: BundleKey.BlaedeworksTubing,
                        offset: [7, -33]
                    },
                    swimming: {
                        name: BundleKey.BlaedeworksSwimming,
                        offset: [6, -5]
                    }
                },
                bestSolo: BossName.CSlime,
                swimmingBodySize: [30, 74],
                tubeType: TubeType.Floatlet
            },
            {
                name: "Eica",
                animations: {
                    tubing: {
                        name: BundleKey.EicaTubing,
                        offset: [8, -32],
                        backgroundOffset: [50, -30]
                    },
                    swimming: {
                        name: BundleKey.EicaSwimming,
                        offset: [12, -11],
                        backgroundOffset: [40, -15]
                    }
                },
                bestSolo: BossName.CSlime,
                swimmingBodySize: [44, 74],
                background: BundleKey.NeonSignThingy,
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
                        offset: [-2, -4]
                    }
                },
                bestSolo: BossName.NKalos,
                swimmingBodySize: [35, 78],
                tubeType: TubeType.Red
            },
            {
                name: "ZeroAgency",
                isZeroAlpha: true,
                animations: {
                    tubing: {
                        name: BundleKey.ZeroAgencyAlphaTubing,
                        offset: [8, -33]
                    },
                    swimming: {
                        name: BundleKey.ZeroAgencyAlphaSwimming,
                        offset: [0, -24]
                    }
                },
                bestSolo: BossName.CSlime,
                swimmingBodySize: [40, 74],
                tubeType: TubeType.Red
            },
            {
                name: "ZeroAgency",
                isZeroBeta: true,
                animations: {
                    tubing: {
                        name: BundleKey.ZeroAgencyBetaTubing,
                        offset: [8, -31]
                    },
                    swimming: {
                        name: BundleKey.ZeroAgencyBetaSwimming,
                        offset: [0, -23]
                    }
                },
                bestSolo: BossName.CSlime,
                swimmingBodySize: [40, 74],
                tubeType: TubeType.Blue
            },
            {
                name: "ViperNoxus",
                animations: {
                    tubing: {
                        name: BundleKey.ViperNoxusTubing,
                        offset: [6, -28]
                    },
                    swimming: {
                        name: BundleKey.ViperNoxusSwimming,
                        offset: [35, -24]
                    }
                },
                bestSolo: BossName.HLucid,
                swimmingBodySize: [44, 74],
                tubeType: TubeType.Blue
            },
            {
                name: "EigenZ",
                isZeroAlpha: true,
                animations: {
                    tubing: {
                        name: BundleKey.EigenAlphaTubing,
                        offset: [8, -34]
                    },
                    swimming: {
                        name: BundleKey.EigenAlphaSwimming,
                        offset: [0, -22]
                    }
                },
                bestSolo: BossName.HBlackMage,
                swimmingBodySize: [44, 74],
                tubeType: TubeType.Red
            },
            {
                name: "EigenZ",
                isZeroBeta: true,
                animations: {
                    tubing: {
                        name: BundleKey.EigenBetaTubing,
                        offset: [6, -33]
                    },
                    swimming: {
                        name: BundleKey.EigenBetaSwimming,
                        offset: [0, -27]
                    }
                },
                bestSolo: BossName.HBlackMage,
                swimmingBodySize: [44, 74],
                tubeType: TubeType.Blue
            }
        ]
    },
    debugging: false
};
