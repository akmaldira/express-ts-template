import path from "path";
import { DataSource } from "typeorm";
import { dbConfig } from "../config/environments";

let database: DataSource;

const AppDataSource = new DataSource({
  type: "postgres",
  host: dbConfig.DB_HOST,
  port: dbConfig.DB_PORT,
  username: dbConfig.DB_USER,
  password: dbConfig.DB_PASS,
  database: dbConfig.DB_NAME,
  synchronize: false,
  logging: dbConfig.DB_LOGGING,
  entities: [__dirname + "/entities/*.entity{.js,.ts}"],
  migrations: [path.resolve() + "/migrations/*.js"],
  migrationsTableName: "migrations",
});

export default AppDataSource;

export async function databaseConnect(): Promise<DataSource> {
  if (database) {
    return database;
  }
  database = await AppDataSource.initialize();
  return database;
}
