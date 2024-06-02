import { Body, Vector } from "matter-js";
import { Container, Rectangle } from "pixi.js";
import { LookDirection } from "../enums/look-direction";
import { GuildMember } from "./guild-member";

export class MemberClickHitbox extends EventTarget {
    root = new Container();

    #member: GuildMember;

    constructor(member: GuildMember) {
        super();
        this.#member = member;
        this.root.eventMode = "dynamic";
        this.root.on("mouseover", () => {
            document.body.classList.add("hover");
        });
        this.root.on("mouseout", () => {
            document.body.classList.remove("hover");
        });
        this.root.on("mousedown", (event) => {
            const character = member.getCurrentCharacterPosition();
            const mouse = event.global;
            const clickedOnRightSide = mouse.x > character.x;

            const angle = Vector.angle(
                Vector.create(character.x, character.y),
                Vector.create(mouse.x, mouse.y)
            );

            const force = Vector.rotate(
                Vector.create(-0.08, 0),
                angle
            );

            const { body } = member;

            Body.applyForce(
                body.parent,
                body.parent.position,
                force
            );

            if (clickedOnRightSide) {
                this.dispatchEvent(
                    new CustomEvent("changelook", {
                        detail: LookDirection.Right
                    })
                );
            } else {
                this.dispatchEvent(
                    new CustomEvent("changelook", {
                        detail: LookDirection.Left
                    })
                );
            }
        });
    }

    readjust(): void {
        const {
            minX,
            maxX,
            minY,
            maxY
        } = this.#member.getCurrentCharacterBounds();
        const width = maxX - minX;
        const height = maxY - minY;
        const bounds = new Rectangle(
            minX,
            minY,
            width,
            height
        );
        this.root.hitArea = bounds;
        this.root.boundsArea = bounds;
    }
}
