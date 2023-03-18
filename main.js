const http = require("http");
const { runInContext } = require("vm");
const db = require("./db");
const route = require("./routes")


const PORT = process.env.PORT  || 3000;

route.post("/register", (req, res) => {



    db.run(`INSERT INTO User (username) VALUES(?)`, username, (err) => {
        if (err)
            console.log(err.message);
        else
            return res.end("User registered")
    })
})