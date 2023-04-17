import { GraphQLInt, GraphQLList } from "graphql";

import { TodoType } from "../types";
import { prisma } from "../../database";

const getAllTodos = {
  type: GraphQLList(TodoType),
  resolve: async () => {
    return await prisma.todo.findMany();
  },
};

const getTodoById = {
  type: TodoType,
  args: {
    id: { type: GraphQLInt },
  },
  resolve: async (_: any, args: any) => {
    return await prisma.todo.findFirstOrThrow({
      where: {
        id: args.id,
      },
    });
  },
};

export { getAllTodos, getTodoById };
