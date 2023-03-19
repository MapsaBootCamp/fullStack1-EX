const http = require("http");
const db = require("./db");
const route = require("./routes")
const utils = require("./utils");
const {userController, bookController} = require("./controllers")


const PORT = process.env.PORT  || 3000;

route.post("/register", userController.register);

route.post("/new-book", bookController.new);

route.post("/all-books", bookController.all)

http.createServer(route.handler)
    .listen(PORT, () => 
    console.log(`run server on Port ${PORT}`)
    );