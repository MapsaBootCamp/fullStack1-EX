import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { addUser, addTodo , editTodo , deleteTodo } from "./mutation";
import { userByIdQuery, usersQuery, todoByIdQuery , todosQuery} from "./query";

const rootQuery = new GraphQLObjectType({
  name: "Query",
  description: "all query types",
  fields: {
    userByIdQuery,
    usersQuery,
    todoByIdQuery,
    todosQuery,
  },
});

const rootMutation = new GraphQLObjectType({
  name: "Mutation",
  description: "all mutation types",
  fields: {
    addUser,
    addTodo,
    editTodo,
    deleteTodo,
  },
});

const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});

export default schema;
