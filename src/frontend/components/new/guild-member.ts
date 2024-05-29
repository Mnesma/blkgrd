import * as Matter from "matter-js";
import * as Pixi from "pixi.js";
import { LookDirection } from "../../enums/look-direction";
import { Actor } from "../../interfaces/actor";
import { PixiRenderable } from "../../interfaces/new/pixi-renderable";
import { Character } from "./character";
import { Flag, Flags, FlagsMode } from "./flags";
import { GenericPixiRenderable } from "./generic-pixi-renderable";
import { Vector2 } from "./vector2";

const GuildMemberStateFlag = {
    Tubing: new Flag(),
    Swimming: new Flag()
};

export class GuildMember implements PixiRenderable, Actor {
    public root = new Pixi.Container();
    public state = new Flags(FlagsMode.Xor);
    public name: string;
    public body!: Matter.Body;

    private characters: Character[];

    constructor(name: string, characters: Character[], x: number, y: number) {
        this.name = name;
        this.characters = characters;

        this.state.addEventListener(
            GuildMemberStateFlag.Tubing.isSet(),
            this.startTubing
        );
        this.state.addEventListener(
            GuildMemberStateFlag.Tubing.isUnset(),
            this.stopTubing
        );
        this.state.addEventListener(
            GuildMemberStateFlag.Swimming.isSet(),
            this.startSwimming
        );
        this.state.addEventListener(
            GuildMemberStateFlag.Swimming.isUnset(),
            this.stopSwimming
        );

        for (const character of this.characters) {
            this.root.addChild(character.root);
            character.sprites.tubing.show();
            character.sprites.tube.show();
            character.sprites.splash.show();
        }

        this.createBodies(x, y);
    }

    public look(direction: LookDirection): void {
        this.characters.forEach(character => character.look(direction));
    }

    public setPosition(newPosition: Vector2): void {
        GenericPixiRenderable.setPosition(this.root, newPosition);
    }

    private createBodies(x: number, y: number): void {
        this.body = Matter.Body.create({});
        const parts = [];

        for (const character of this.characters) {
            const tubeSprite = character.sprites.tube;
            const { x: tubeX, y: tubeY, width, height } = tubeSprite
                .getBounds();
            parts.push(
                Matter.Bodies.rectangle(x + tubeX, y + tubeY, width, height)
            );
        }

        Matter.Body.setParts(this.body, parts);
    }

    private startTubing = (): void => {
        for (const character of this.characters) {
            character.sprites.tubing.show();
            character.sprites.tube.show();
            character.sprites.splash.show();
            character.playSurfaceAnimation();
        }
    };

    private stopTubing = (): void => {
        for (const character of this.characters) {
            character.sprites.tubing.hide();
            character.sprites.tube.hide();
            character.sprites.splash.hide();
        }
    };

    private startSwimming = (): void => {
        for (const character of this.characters) {
            character.sprites.swimming.show();
            character.playSinkAnimation();
        }
    };

    private stopSwimming = (): void => {
        for (const character of this.characters) {
            character.sprites.swimming.hide();
        }
    };
}
