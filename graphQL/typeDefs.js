import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import db from "../prisma/db.js";

export const UserType = new GraphQLObjectType({
  name: "userInfo",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
  },
});

export const ToDoType = new GraphQLObjectType({
  name: "allToDos",
  fields: {
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    status: { type: GraphQLBoolean },
    userId: {
      type: UserType,
      resolve: async (parent, args) => {
        return await db.user.findUnique({
          where: { id: parent.userId },
        });
      },
    },
  },
});
