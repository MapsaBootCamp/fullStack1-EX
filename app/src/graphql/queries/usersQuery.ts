import { GraphQLInt, GraphQLList } from "graphql";

import { UserType } from "../types";
import { prisma } from "../../database";

const getAllUsers = {
  type: GraphQLList(UserType),
  resolve: async () => {
    return await prisma.user.findMany();
  },
};

const getUserById = {
  type: UserType,
  args: {
    id: { type: GraphQLInt },
  },
  resolve: async (_: any, args: any) => {
    return await prisma.user.findFirstOrThrow({
      where: {
        id: args.id,
      },
    });
  },
};

export { getAllUsers, getUserById };
