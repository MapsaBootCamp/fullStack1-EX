import { Response, NextFunction, Handler } from "express";
import * as JWT from "jsonwebtoken";

import { UserOutputI, AuthRequest, ErrorI } from "../interfaces/";
import { UserService } from "../services";
import { Role, User } from "../database";
import config from "../config";
import { exclude } from "../utilities";

const userService = new UserService();

const authJWT = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authorization =
    req.headers.authorization || req.signedCookies.authorization;

  if (authorization) {
    const token: string = authorization.includes("Bearer")
      ? authorization.split(" ")[1]
      : authorization;

    try {
      const playload = JWT.verify(
        token,
        config.getSecretKey()
      ) as JWT.JwtPayload;

      const email: string = playload.email;
      const user = (await userService.findByEmail(email.toLowerCase())) as User;

      if (user) {
        req.user = exclude(user, ["password"]);
      } else {
        const error: ErrorI = new Error();
        error.message = "Invalid token";
        error.code = 400;
        next(error);
      }
      next();
    } catch (er) {
      const error: ErrorI = new Error();
      error.message = "Invalid token";
      error.code = 400;
      next(error);
    }
  } else {
    return res.redirect("/login");
  }
};

const isLoggedIn = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authorization =
    req.headers.authorization || req.signedCookies.authorization;

  if (authorization) {
    const token: string = authorization.includes("Bearer")
      ? authorization.split(" ")[1]
      : authorization;

    const playload = JWT.verify(token, config.getSecretKey()) as JWT.JwtPayload;
    if (playload.email) {
      return res.redirect("/");
    } else {
      next();
    }
  } else {
    next();
  }
};

const admin = (req: AuthRequest, res: Response, next: NextFunction): any => {
  if (!req.user) {
    throw new Error("We need use auth middleware first");
  }

  if (req.user.role === Role.ADMIN) {
    next();
  } else {
    const error: ErrorI = new Error();
    error.message = "You are not authorized";
    error.code = 401;
    next(error);
  }
};

const operator = (req: AuthRequest, res: Response, next: NextFunction): any => {
  if (!req.user) {
    throw new Error("We need use auth middleware first");
  }

  if (req.user.role === Role.ADMIN || req.user.role === Role.OPERATOR) {
    next();
  } else {
    const error: ErrorI = new Error();
    error.message = "You are not authorized";
    error.code = 401;
    next(error);
  }
};

const self = (req: AuthRequest, res: Response, next: NextFunction): any => {
  if (!req.user) {
    throw new Error("We need use authenticate user first");
  }
  if (req.user.role === Role.ADMIN || req.user.role === Role.OPERATOR) {
    next();
  } else if (
    req.user.role === Role.CLIENT &&
    Number(req.params.id) === req.user.id
  ) {
    next();
  } else {
    const error: ErrorI = new Error();
    error.message = "It's Forbidden";
    error.code = 403;
    next(error);
  }
};

export { authJWT, admin, operator, self, isLoggedIn };
