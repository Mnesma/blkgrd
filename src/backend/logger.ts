import redis, { createClient as RedisCreateClient } from "redis";
import uuid from "short-uuid";
import winston from "winston";
import { property, UnknownObject, valueOf } from "./shared/unknown-object";
import { Utilities } from "./shared/utilities";

import type { Optional } from "../shared/optional";
import type { LoggingMessage } from "./types/logging-message";

const [environment, error] = Utilities.getEnvironment({
    "PORT": Number,
    "HOST": String,
    "USERNAME": String,
    "PASSWORD": String,
    "LEVEL": String,
    "LOG_TO_CONSOLE": Boolean
});

if (error) {
    throw error;
}

class Logger {
    private readonly id = uuid.generate();
    private client!: ReturnType<typeof RedisCreateClient>;
    private winston!: winston.Logger;

    constructor(...args: Parameters<Logger["init"]>) {
        this.init(...args);
    }

    private async init(
        PORT: number,
        HOST: string,
        USERNAME: string,
        PASSWORD: string,
        LEVEL: string,
        LOG_TO_CONSOLE: boolean
    ): Promise<void> {
        await Promise.all([
            this.createRedisClient(PORT, HOST, USERNAME, PASSWORD),
            this.createWinstonLogger(LEVEL, LOG_TO_CONSOLE)
        ]);

        this.processQueues();
    }

    private createWinstonLogger(LEVEL: string, LOG_TO_CONSOLE: boolean): void {
        this.winston = winston.createLogger({
            level: LEVEL,
            levels: winston.config.npm.levels,
            format: winston.format.json({ space: 2 }),
            defaultMeta: { id: this.id },
            transports: [
                new winston.transports.File({
                    filename: `logger-${this.id}.log`
                })
            ]
        });

        if (!LOG_TO_CONSOLE) {
            return;
        }

        this.winston.add(
            new winston.transports.Console({
                level: "info",
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple()
                )
            })
        );
    }

    private async createRedisClient(
        PORT: number,
        HOST: string,
        USERNAME: string,
        PASSWORD: string
    ): Promise<void> {
        this.client = await redis.createClient({
            url: `redis://${USERNAME}:${PASSWORD}@${HOST}:${PORT}`
        })
            .on("error", (error) => {
                console.error("Redis Client Error", error);
            })
            .connect();
    }

    private async processQueues(): Promise<void> {
        const tempQueueMessage = await this.client.rPop("blkgrd:logging:temp");

        if (tempQueueMessage !== null) {
            this.processMessage(tempQueueMessage);
        }
    }

    private processMessage(rawMessage: string): Optional<Error> {
        const [payload, error] = Utilities.messageToJson(rawMessage);

        if (error) {
            return error;
        }

        const [describedObject, objectNarrowingError] = UnknownObject(payload)
            .describedBy<LoggingMessage>(
                property("level").exists(),
                valueOf("level").isType("string"),
                valueOf("level").existsIn(winston.config.npm.levels),
                property("content").exists(),
                valueOf("content").isType("string")
            );

        if (objectNarrowingError) {
            return error;
        }

        return null;
    }
}

new Logger(
    environment.PORT,
    environment.HOST,
    environment.USERNAME,
    environment.PASSWORD,
    environment.LEVEL,
    environment.LOG_TO_CONSOLE
);
