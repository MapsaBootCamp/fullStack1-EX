import * as dotenv from "dotenv";
dotenv.config();

class Config {
  public PORT: Number;
  public APP_NAME: string;
  public NODE_ENV: string;
  public DB_URL: string;
  public DB_NAME: string;

  constructor() {
    this.APP_NAME = process.env.APP_NAME || "Starter ExpressTS GraphQL Mongo";
    this.PORT = Number(process.env.PORT) || 5000;
    this.NODE_ENV = process.env.NODE_ENV || "development";
    this.DB_URL =
      process.env.DB_URL || "mongodb://root:example@localhost:27017/";
    this.DB_NAME = process.env.DB_NAME || "todoapp";
  }

  isDevEnvironment() {
    return this.NODE_ENV === "development";
  }
}

const config = new Config();

export default config;
