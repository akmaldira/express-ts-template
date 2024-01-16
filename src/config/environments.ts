const envPath = process.env.NODE_ENV == "production" ? ".env" : ".env.dev";
require("dotenv").config({ path: envPath });

let { NODE_ENV, PORT, DB_LOGGING } = process.env;
const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME, JWT_SECRET } = process.env;

if (!NODE_ENV) NODE_ENV = "development";

if (!PORT) PORT = "3000";

if (!DB_HOST) throw new Error("DB_HOST is not defined");

if (!DB_PORT) throw new Error("DB_PORT is not defined");

if (!DB_USER) throw new Error("DB_USER is not defined");

if (!DB_PASS) throw new Error("DB_PASS is not defined");

if (!DB_NAME) throw new Error("DB_NAME is not defined");

if (!DB_LOGGING) DB_LOGGING = "false";

if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");

export const dbConfig = {
  DB_HOST,
  DB_PORT: Number(DB_PORT),
  DB_USER,
  DB_PASS,
  DB_NAME,
  DB_LOGGING: DB_LOGGING === "true" ? true : false,
};

export const appConfig = {
  NODE_ENV,
  PORT: Number(PORT),
  JWT_SECRET,
};
