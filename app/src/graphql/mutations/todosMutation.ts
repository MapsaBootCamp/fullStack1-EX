import { TodoType, TodoInputType, TodoUpdateType } from "../types";
import { prisma } from "../../database";
import { addDaysToDate } from "../../utils";
import { GraphQLInt, GraphQLString } from "graphql";

const createTodo = {
  type: TodoType,
  args: {
    input: { type: TodoInputType },
  },
  resolve: async (_: any, args: any) => {
    try {
      return await prisma.todo.create({
        data: {
          title: args.input.title,
          dueDate: addDaysToDate(args.input.dueDate),
          User: {
            connect: {
              id: args.input.userId,
            },
          },
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};

const updateTodoById = {
  type: TodoType,
  args: {
    id: { type: GraphQLInt },
    input: { type: TodoUpdateType },
  },
  resolve: async (_: any, args: any) => {
    try {
      return await prisma.todo.update({
        where: {
          id: args.id,
        },
        data: {
          title: args.input.title,
          dueDate: addDaysToDate(args.input.dueDate),
          status: args.input.status,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};

const deleteTodoById = {
  type: GraphQLString,
  args: {
    id: { type: GraphQLInt },
  },
  resolve: async (_: any, args: any) => {
    try {
      await prisma.todo.delete({
        where: {
          id: args.id,
        },
      });
      return `Todo with id:${args.id} has been deleted`;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};

export { createTodo, updateTodoById, deleteTodoById };
