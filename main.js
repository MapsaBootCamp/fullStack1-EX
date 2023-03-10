const db = require("./db");
const http = require("http");
const routes = require("./routes");
const { StatusCodes } = require("http-status-codes");
const fs = require("fs");
const utils = require("./utils");
const { contentTypes } = require("./content-type");

const PORT = process.env.PORT || 3000;

routes.get("/", (req, res) => {
  const path = "./veiw/main.html";
  utils.openHtmlFile(path, res);
  return;
});

routes.get("/books", (req, res) => {
  console.log(req.body);
  // return;
});

const server = http.createServer(routes.handler);
server.listen(PORT, console.log(`server creat on port ${PORT}`));
