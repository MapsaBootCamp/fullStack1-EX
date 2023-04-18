import { GraphQLInt, GraphQLObjectType } from "graphql";
import db from "../prisma";
import { UserType, TodoType } from "./types";

export const userByIdQuery = {
  type: GraphQLObjectType(UserType),
  args: {
    id: { type: GraphQLInt },
  },
  resolve: async (_, args) => {
    return await db.user.findUnique({
      id: args.id,
    });
  },
};

export const usersQuery = {
  type: GraphQLObjectType(UserType),
  resolve: async () => {
    return await db.user.findMany();
  },
};

export const todoByIdQuery = {
  type: TodoType,
  args: {
    id: { type: GraphQLInt },
  },
  resolve: async (_, args) => {
    return await db.todo.findMany({
      where: {
        id: args.id,
      },
    });
  },
};

export const todosQuery = {
  type: TodoType,
  resolve: async () => {
    return await db.todo.findMany();
  },
};
