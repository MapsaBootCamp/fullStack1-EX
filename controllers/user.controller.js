const utils = require("../utils")
const db = require("../db")

exports.register = (req, res) => {
    console.log("bbabe");
    const {username} = req.body;
    db.run(`INSERT INTO User (username) VALUES(?)`, username, (err) => {
        if (err)
            console.log(err.message);
        else
            return res.end("User registered")
    })
}