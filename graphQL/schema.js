import { GraphQLObjectType, GraphQLSchema } from "graphql";
import {
  addNewUserQuery,
  createNewToDoQuery,
  deleteToDoQuery,
  todoQuery,
  updateToDoQuery,
  userQuery,
} from "./query.js";

const RootQuery = new GraphQLObjectType({
  name: "Queries",
  description: "get all queries",
  fields: {
    getAllUsers: userQuery,
    getAllTodos: todoQuery,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutations",
  description: "get all mutations",
  fields: {
    addNewUser: addNewUserQuery,
    createNewToDo: createNewToDoQuery,
    updateToDo: updateToDoQuery,
    deleteToDo: deleteToDoQuery,
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

export default schema;
