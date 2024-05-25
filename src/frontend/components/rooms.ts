import { Container } from "pixi.js";
import { BASE_CANVAS_HEIGHT, CANVAS_MIN_WIDTH } from "../constants/sizes";
import { UNDER_WATER_START } from "../constants/start-positions";
import { Room } from "../types/room";
import { Obstacle } from "./obstacle";

export class Rooms {
    static obstacleSize = 100;

    static divider = new Obstacle(
        0,
        UNDER_WATER_START - 5,
        CANVAS_MIN_WIDTH,
        25
    );

    static get aboveWater(): Room {
        const roomHeight = 218;
        const roomStart = UNDER_WATER_START - roomHeight
            - Rooms.obstacleSize;
        const sideObstacleStart = roomStart + Rooms.obstacleSize / 2;
        const sideObstacleHeight = 300;
        const obstacles = [
            new Obstacle(0, roomStart, CANVAS_MIN_WIDTH, Rooms.obstacleSize),
            Rooms.divider,
            new Obstacle(
                -Rooms.obstacleSize,
                sideObstacleStart,
                Rooms.obstacleSize,
                sideObstacleHeight
            ),
            new Obstacle(
                CANVAS_MIN_WIDTH,
                sideObstacleStart,
                Rooms.obstacleSize,
                sideObstacleHeight
            )
        ];

        return this.obstaclesToRoom(obstacles);
    }

    static get belowWater(): Room {
        const roomStart = UNDER_WATER_START - Rooms.obstacleSize;
        const sideObstacleStart = roomStart + Rooms.obstacleSize / 2;
        const sideObstacleHeight = BASE_CANVAS_HEIGHT - roomStart;

        const obstacles = [
            new Obstacle(
                0,
                BASE_CANVAS_HEIGHT - 50,
                CANVAS_MIN_WIDTH,
                Rooms.obstacleSize
            ),
            new Obstacle(
                -Rooms.obstacleSize,
                sideObstacleStart,
                Rooms.obstacleSize,
                sideObstacleHeight
            ),
            new Obstacle(
                CANVAS_MIN_WIDTH,
                sideObstacleStart,
                Rooms.obstacleSize,
                sideObstacleHeight
            )
        ];

        return this.obstaclesToRoom(obstacles);
    }

    static obstaclesToRoom(obstacles: Obstacle[]): Room {
        return obstacles.reduce<Room>((room, obstacle) => {
            room.bodies.push(obstacle.body);
            room.root.addChild(obstacle.root);
            return room;
        }, { bodies: [], root: new Container() });
    }
}
