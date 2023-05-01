import path from "path";

import * as dotenv from "dotenv";
dotenv.config();

class Config {
  private SECRET_KEY: string;
  private SESSION_KEY: string;

  public PORT: number;
  public APP_NAME: string;
  public NODE_ENV: string;
  public SESSION_LIFETIME: number;
  public __basedirAvatar: string = path.join(process.cwd(), "/public/images/");
  public __basedirStorage: string = path.join(process.cwd(), "/storage/");
  public __viewdir: string = path.join(process.cwd(), "/public/views/");
  public __staticdir: string = path.join(process.cwd(), "/static/");
  public __logdir: string = path.join(process.cwd(), "/logs/");

  constructor() {
    this.APP_NAME = process.env.APP_NAME || "ExpressTS";
    this.PORT = Number(process.env.PORT) || 3002;
    this.NODE_ENV = process.env.NODE_ENV || "development";
    this.SECRET_KEY = process.env.SECRET_KEY || "SECRET_KEY";
    this.SESSION_KEY = process.env.SESSION_KEY || "SECRET_KEY";
    this.SESSION_LIFETIME = Number(process.env.SESSION_LIFETIME) || 3600000;
  }

  isDevEnvironment() {
    return this.NODE_ENV === "development";
  }

  getSecretKey() {
    return this.SECRET_KEY;
  }

  getSessionKey() {
    return this.SESSION_KEY;
  }
}

const config: Config = new Config();

export default config;
