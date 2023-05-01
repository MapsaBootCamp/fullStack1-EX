import { Request } from "express";
import { UserOutputI } from "./user.interface";

type AuthRequest = Request & {
  user: UserOutputI;
  files?: Express.Multer.File[];
};

type Login = {
  email: string;
  password: string;
};

export { AuthRequest, Login };
