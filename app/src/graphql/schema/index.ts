import { GraphQLObjectType, GraphQLSchema } from "graphql";

import { getAllTodos, getTodoById, getAllUsers, getUserById } from "../queries";
import {
  createTodo,
  updateTodoById,
  deleteTodoById,
  createUser,
} from "../mutations";

const rootQuery = new GraphQLObjectType({
  name: "Query",
  description: "all query types",
  fields: {
    getAllTodos,
    getTodoById,
    getAllUsers,
    getUserById,
  },
});

const rootMutation = new GraphQLObjectType({
  name: "Mutation",
  description: "all mutation types",
  fields: {
    createTodo,
    updateTodoById,
    deleteTodoById,
    createUser,
  },
});

const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});

export default schema;
