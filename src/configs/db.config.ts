import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Pool } from "pg";

@Injectable()
export class PostgresService {
    #_pool: Pool;
    constructor() {
        this.#_pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: Number(process.env.DB_PORT) ? Number(process.env.DB_PORT) : 5432,
        });
    }

    async query(queryStr:string,params: any[] = []) {
        try {
            const {rows} = await this.#_pool.query(queryStr,params);
            return rows;
        } catch (error) {
            console.log(error.message);
            
            throw new InternalServerErrorException("Something went wrong!");
        }
    }
}