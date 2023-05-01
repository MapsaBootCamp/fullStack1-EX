import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import expressSession from "express-session";

import config from "../config";
import apiRouter from "../routes";
import { errorHandler, logRequest } from "../middlewares";

class ExpressLoader {
  public app: Express;

  constructor() {
    this.app = express();

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(cookieParser(config.getSessionKey()));
    this.app.use(
      expressSession({
        secret: config.getSessionKey(),
        resave: false,
        saveUninitialized: true,
        cookie: {
          secure: !config.isDevEnvironment(),
          maxAge: config.SESSION_LIFETIME,
        },
      })
    );

    this.app.set("view engine", "ejs");
    this.app.set("views", config.__viewdir);
    this.app.use(express.static(config.__staticdir));

    // apiRouter("/api/v1", this.app);
    apiRouter("", this.app);

    this.app.use(errorHandler);

    this.app.use(logRequest);
    this.app.use(this.pathNotFound);
  }

  pathNotFound(req: Request, res: Response): Response {
    return res.status(404).json({
      error: {
        status: true,
        code: 404,
        message: "This API path deos not exist",
      },
    });
  }

  run(): void {
    this.app.listen(config.PORT, () => {
      console.log(
        `${config.APP_NAME} app server is running on port ${config.PORT} in ${config.NODE_ENV} environment`
      );
    });
  }
}

export default ExpressLoader;
