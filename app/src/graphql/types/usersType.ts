import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLEnumType,
  GraphQLInputObjectType,
} from "graphql";

import { TodoType } from "./todosType";
import { prisma } from "../../database";

const Role = new GraphQLEnumType({
  name: "Role",
  description: "Role enums",
  values: {
    CLIENT: { value: "CLIENT" },
    ADMIN: { value: "ADMIN" },
    OPERATOR: { value: "OPERATOR" },
    DEACTIVATED: { value: "DEACTIVATED" },
  },
});

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: {
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    phone: { type: GraphQLNonNull(GraphQLString) },
    avatarUrl: { type: GraphQLString },
    role: { type: GraphQLNonNull(Role) },
    createdAt: { type: GraphQLNonNull(GraphQLString) },
    updatedAt: { type: GraphQLNonNull(GraphQLString) },
    // password: { type: GraphQLNonNull(GraphQLString) },
    todos: {
      type: GraphQLList(TodoType),
      resolve: async (parent) => {
        return await prisma.todo.findMany({
          where: {
            userId: parent.id,
          },
        });
      },
    },
  },
});

const UserInputType = new GraphQLInputObjectType({
  name: "UserInputType",
  description: "User input type",
  fields: {
    name: { type: GraphQLNonNull(GraphQLString) },
    phone: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
    role: { type: Role },
  },
});

export { UserType, UserInputType };
