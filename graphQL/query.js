import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
} from "graphql";
import { ToDoType, UserType } from "./typeDefs.js";
import db from "../prisma/db.js";

export const userQuery = {
  type: new GraphQLList(UserType),
  resolve: async () => {
    return await db.user.findMany();
  },
};

export const addNewUserQuery = {
  type: UserType,
  args: { name: { type: GraphQLString } },
  resolve: async (parent, args) => {
    return await db.user.create({
      data: { name: args.name },
    });
  },
};

export const todoQuery = {
  type: new GraphQLList(ToDoType),
  resolve: async () => {
    return await db.todo.findMany();
  },
};

export const createNewToDoQuery = {
  type: ToDoType,
  args: {
    userId: { type: GraphQLInt },
    title: { type: GraphQLString },
    status: { type: GraphQLBoolean },
  },
  resolve: async (parent, args) => {
    return await db.todo.create({
      data: { ...args },
    });
  },
};

export const updateToDoQuery = {
  type: ToDoType,
  args: {
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    status: { type: GraphQLBoolean },
  },
  resolve: async (parent, args) => {
    return await db.todo.update({
      where: { id: args.id },
      data: { ...args },
    });
  },
};

export const deleteToDoQuery = {
  type: ToDoType,
  args: { id: { type: GraphQLInt } },
  resolve: async (parent, args) => {
    return await db.todo.delete({
      where: { id: args.id },
    });
  },
};
