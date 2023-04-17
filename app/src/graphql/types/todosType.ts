import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLEnumType,
} from "graphql";

const Status = new GraphQLEnumType({
  name: "Status",
  description: "Status enums",
  values: {
    DONE: { value: "DONE" },
    PROGRESS: { value: "PROGRESS" },
  },
});

const TodoType = new GraphQLObjectType({
  name: "TodoType",
  description: "Todo type",
  fields: {
    id: { type: GraphQLNonNull(GraphQLInt) },
    title: { type: GraphQLNonNull(GraphQLString) },
    dueDate: { type: GraphQLNonNull(GraphQLString) },
    status: { type: Status },
    userId: { type: GraphQLNonNull(GraphQLInt) },
    createdAt: { type: GraphQLNonNull(GraphQLString) },
    updatedAt: { type: GraphQLNonNull(GraphQLString) },
  },
});

const TodoInputType = new GraphQLInputObjectType({
  name: "TodoInputType",
  description: "Todo input type",
  fields: {
    title: { type: GraphQLNonNull(GraphQLString) },
    dueDate: { type: GraphQLNonNull(GraphQLInt) },
    userId: { type: GraphQLNonNull(GraphQLInt) },
  },
});

const TodoUpdateType = new GraphQLInputObjectType({
  name: "TodoUpdateType",
  description: "Todo update type",
  fields: {
    title: { type: GraphQLString },
    dueDate: { type: GraphQLInt },
    status: { type: Status },
  },
});

export { TodoType, TodoInputType, TodoUpdateType, Status };
