import { graphqlHTTP } from "express-graphql";
import express from "express";
import schema from "./graphql/schema";

const app = express();


app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.ENV_MODE !== "production",
  })
);


app.listen(3000, () => {
  console.log("Server Up On Port 3000");
});
