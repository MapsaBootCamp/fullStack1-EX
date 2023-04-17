import bcrypt from "bcrypt";

import { UserType, UserInputType } from "../types";
import { prisma } from "../../database";

function hashedPass(inputPass: string) {
  return bcrypt.hashSync(inputPass, 12);
}

const createUser = {
  type: UserType,
  args: {
    input: { type: UserInputType },
  },
  resolve: async (_: any, args: any) => {
    try {
      const hashedPassword = hashedPass(args.input.password);
      return await prisma.user.create({
        data: {
          name: args.input.name,
          phone: args.input.phone,
          role: args.input.role,
          password: hashedPassword,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};

export { createUser };
