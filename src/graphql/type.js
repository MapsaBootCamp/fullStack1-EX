import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import db from "../prisma";

export const TodoUpdateType = new GraphQLInputObjectType({
  name: "TodoUpdateType",
  description: "todo update data",
  fields: {
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    status: { type: GraphQLBoolean },
  },
});

export const UserType = new GraphQLObjectType({
  name: "userType",
  description: "users type",
  fields: {
    id: { type: GraphQLNonNull(GraphQLInt) },
    username: { type: GraphQLString },
    createdAt: { type: GraphQLInt },
    todo: {
      type: TodoType,
      resolve: (parent) => {
        return db.user.findMany({
          where : {
            id : parent.id
          }
        })
      },
    },
  },
});

export const TodoType = new GraphQLObjectType({
  name: "todoType",
  description: "todos type",
  fields: {
    id: { type: GraphQLNonNull(GraphQLInt) },
    title: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    status: { type: GraphQLBoolean },
    user: {
      type: GraphQLList(UserTypeInTodo),
      resolve: (parent) => {
        return db.todo.findMany({
          where: {
            id: parent.id,
          },
        });
      },
    },
  },
});
