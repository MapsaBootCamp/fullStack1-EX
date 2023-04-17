import express, { Request, Express, Response } from "express";
import { graphqlHTTP } from "express-graphql";

import config from "../config";
import schema from "../graphql/schema";

class ExpressLoader {
  public app: Express;

  constructor() {
    this.app = express();

    this.app.use(express.json());

    this.app.use(
      "/graphql",
      graphqlHTTP({
        schema: schema,
        graphiql: true,
      })
    );

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
