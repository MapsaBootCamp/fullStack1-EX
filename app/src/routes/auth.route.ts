import express, { Request, Response, NextFunction } from "express";

import { AuthService, UserService } from "../services";
import { AuthController } from "../controllers/";
import { auth, logAccess, logRequest } from "../middlewares";
import { AuthRequest } from "../interfaces";

const router = express.Router();

const authController = new AuthController(new AuthService(), new UserService());

router.get(
  "/login",
  auth.isLoggedIn,
  logRequest,
  (req: Request, res: Response, next: NextFunction) => {
    authController.loginPage(req, res, next);
  }
);
router.post(
  "/login",
  logRequest,
  (req: Request, res: Response, next: NextFunction) =>
    authController.loginRequest(req, res, next)
);
router.post(
  "/register",
  logRequest,
  (req: Request, res: Response, next: NextFunction) =>
    authController.registerRequest(req, res, next)
);
router.get(
  "/register",
  auth.isLoggedIn,
  logRequest,
  (req: Request, res: Response, next: NextFunction) => {
    authController.registerPage(req, res, next);
  }
);
router.post(
  "/logout",
  auth.authJWT,
  logAccess,
  (req: Request, res: Response, next: NextFunction) => {
    authController.logout(req, res, next);
  }
);

export default router;
