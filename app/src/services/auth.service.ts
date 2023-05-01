import { User } from "@prisma/client";
import { db } from "../database";
import { UserCreateI } from "../interfaces";

class AuthService {
  constructor() {}

  async create(userObject: UserCreateI): Promise<User> {
    return await db.user.create({
      data: userObject,
    });
  }
}

export default AuthService;
