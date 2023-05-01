import { Express } from "express";

import authRouter from "./auth.route";
import userRouter from "./user.route";

function apiRouter(path: string = "", expressApp: Express) {
  expressApp.use(path + "/", authRouter);
  expressApp.use(path + "/", userRouter);
}

export default apiRouter;
