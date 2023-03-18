const express = require("express");
require("dotenv").config();
const { userRout, quizRout } = require("./routes");

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use("/user", userRout);
app.use("/quiz", quizRout);

app.listen(port, () => {
  console.log(`connect to port ${port}`);
});
