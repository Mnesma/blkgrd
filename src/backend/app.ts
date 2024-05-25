import FastifyStatic from "@fastify/static";
import Fastify from "fastify";
import fs from "node:fs";
import path from "node:path";
import { Utilities } from "./shared/utilities";

const [environment, error] = Utilities.getEnvironment({
    "PORT": Number,
    "HOST": String,
    "PGPORT": Number,
    "PGHOST": String,
    "PGUSER": String,
    "PGPASSWORD": String,
    "PGSSL": Boolean
});

if (error) {
    throw error;
}

const fastify = Fastify();

const staticFilesDir = path.resolve("build/frontend/public");
const indexFilePath = path.resolve("build/frontend/index.html");

fastify.register(FastifyStatic, {
    root: staticFilesDir,
    prefix: "/public/",
    constraints: {
        host: environment.HOST
    }
});

fastify.get("/", (_, response) => {
    const stream = fs.createReadStream(indexFilePath);
    response.type("text/html").send(stream);
});

const main = async () => {
    try {
        await fastify.listen({ port: environment.PORT });
        console.log(`blkgrd.com listening on port ${environment.PORT}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

main();
