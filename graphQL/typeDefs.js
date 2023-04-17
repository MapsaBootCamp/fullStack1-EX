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
      // parent always see his top level object, for example here it readss id from id's field.
      resolve: (parent, args) => {
        return db.user.findMany({
          where: { id: parent.id },
        });
      },
    },
  },
});
