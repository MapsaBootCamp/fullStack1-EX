import { GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";
import { UserType, TodoType , TodoUpdateType} from "./types";
import db from "../prisma";

export const addUser = {
  type: UserType,
  args: {
    username: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_, args) => {
    return await db.user.create({
      data: { username: args.username },
    });
  },
};

export const addTodo = {
  type: TodoType,
  args: {
    userId: { type: GraphQLNonNull(GraphQLInt) },
    title: { type: GraphQLNonNull(GraphQLString) },
    status: { type: GraphQLBoolean },
  },
  resolve: async (_, args) => {
    return await db.todo.create({
      data: { ...args },
    });
  },
};

export const editTodo = {
  type: TodoUpdateType,
  args: {
    id: { type: GraphQLNonNull(GraphQLInt) },
    title: { type: GraphQLNonNull(GraphQLString) },
    status: { type: GraphQLNonNull(GraphQLBoolean) },
  },
  resolve: async (_, args) => {
    return await db.todo.update({
      where: {
        id: args.id,
      },
      data: { ...args },
    });
  },
};

export const deleteTodo = {
  type: TodoUpdateType,
  args: { id: { type: GraphQLNonNull(GraphQLInt) } },
  resolve: async (_, args) => {
    return await db.todo.delete({
      where: {
        id: args.id,
      },
    });
  },
};
