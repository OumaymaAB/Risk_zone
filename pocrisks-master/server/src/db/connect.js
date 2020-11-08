import { Client } from "pg";
import conf from "dotenv";

conf.config();

export const client = new Client();

client.connect();
