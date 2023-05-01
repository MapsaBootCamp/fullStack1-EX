import { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcrypt";
import * as JWT from "jsonwebtoken";

import { AuthService, UserService } from "../services";
import { UserCreateI, ErrorI, Login, User, AuthRequest } from "../interfaces";
import config from "../config";

class AuthController {
  private authService: AuthService;
  private userService: UserService;

  private static saltRounds = 12;

  constructor(authService: AuthService, userService: UserService) {
    this.authService = authService;
    this.userService = userService;
  }

  comparePasswrod(inputPass: string, userPass: string) {
    return bcrypt.compareSync(inputPass, userPass);
  }

  static hashedPass(inputPass: string) {
    return bcrypt.hashSync(inputPass, AuthController.saltRounds);
  }

  newToken(email: string): string {
    return JWT.sign({ email }, process.env.SECRET_KEY as string, {
      expiresIn: Number(process.env.TOKEN_EXPIRE_TIME),
    });
  }

  async loginPage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    res.render("login", { pageTitle: "Sign in" });
  }

  async loginRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const validCredential: Login = req.body;

    try {
      const validCredential: Login = req.body;
      const user: User = (await this.userService.findByEmail(
        validCredential.email
      )) as User;
      if (user) {
        if (this.comparePasswrod(validCredential.password, user.password)) {
          const token: string = this.newToken(user.email);

          return res
            .cookie("authorization", token, {
              signed: true,
              httpOnly: true,
              secure: !config.isDevEnvironment(),
              maxAge: config.SESSION_LIFETIME,
            })
            .status(200)
            .redirect("/");
        }
      }

      const error: ErrorI = new Error();
      error.message = "Email and password doesn't match";
      error.code = 401;
      next(error);
    } catch (error) {
      next(error);
    }
  }

  async registerPage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    res.render("register", { pageTitle: "Register" });
  }

  async registerRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const validUser: UserCreateI = req.body;
    try {
      const oldUser: User = (await this.userService.findByEmail(
        validUser.email
      )) as User;

      if (!oldUser) {
        const hashedPassword = AuthController.hashedPass(validUser.password);

        validUser.password = hashedPassword;
        validUser.email = validUser.email.toLowerCase();

        const newUser = await this.authService.create(validUser);

        const token: string = this.newToken(newUser.email);

        return res
          .cookie("authorization", token, {
            signed: true,
            httpOnly: true,
            secure: !config.isDevEnvironment(),
            maxAge: config.SESSION_LIFETIME,
          })
          .status(200)
          .redirect("/");
      } else {
        const error: ErrorI = new Error();
        error.message = "This email is taken by another user";
        error.code = 406;
        next(error);
      }
    } catch (er) {
      next(er);
    }
  }

  async logout(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      return res.clearCookie("authorization").status(200).redirect("/login");
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
