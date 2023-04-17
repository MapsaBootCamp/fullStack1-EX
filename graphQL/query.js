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
  resolve: () => {
    return db.user.findMany();
  },
};

export const addNewUserQuery = {
  type: UserType,
  args: { name: { type: GraphQLString } },
  resolve: (parent, args) => {
    return db.user.create({
      data: { name: args.name },
    });
  },
};

export const todoQuery = {
  type: new GraphQLList(ToDoType),
  resolve: () => {
    return db.todo.findMany();
  },
};

export const createNewToDoQuery = {
  type: ToDoType,
  args: {
    userId: { type: GraphQLInt },
    title: { type: GraphQLString },
    status: { type: GraphQLBoolean },
  },
  resolve: (parent, args) => {
    return db.todo.create({
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
  resolve: (parent, args) => {
    return db.todo.update({
      where: { id: args.id },
      data: { ...args },
    });
  },
};

export const deleteToDoQuery = {
  type: ToDoType,
  args: { id: { type: GraphQLInt } },
  resolve: (parent, args) => {
    return db.todo.delete({
      where: { id: args.id },
    });
  },
};
