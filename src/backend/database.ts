import { Client, Pool } from "pg";

export class Database {
    private client: Client;
    private pool = new Pool();

    constructor(
        host: string,
        name: string,
        password: string,
        port: number,
        ssl: boolean,
        user: string
    ) {
        this.client = new Client({
            database: name,
            user,
            password,
            host,
            port,
            ssl
        });

        this.pool.on("error", (error) => {
            console.error("");
        });
    }
}
