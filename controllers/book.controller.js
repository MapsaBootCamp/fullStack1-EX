const db = require("../db");

exports.new = (req, res) => {
    const { bookname, count} = req.body;
    db.run("INSERT INTO BOOK (bookname, count) VALUES(?, ?)", [bookname, count], (err) => {
        if (err)
            console.log(err.message);
        else
            return res.end("Book added")
    })
}

exports.all = (req, res) => {
    db.all("SELECT * FROM Book", (err, books) => {
        if (err)
            console.log(err.message);
        else
            res.json(books);
    })
}