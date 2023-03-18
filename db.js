const sqlite3 = require("sqlite3").verbose();

const DBFILENAME = "library.sqlite3";

const db = new sqlite3.Database(DBFILENAME, (err) => {
    if (err)
        console.log(err);
    else{
        console.log("connected to DB");
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS User(
                        userId      INTEGER  PRIMARY KEY,
                        username    TEXT     NOT NULL UNIQUE,
                        password    TEXT
                    )`
            );
            db.run(`CREATE TABLE IF NOT EXISTS Book(
                        bookId      INTEGER  PRIMARY KEY,
                        bookname    TEXT     NOT NULL,
                        count       INTEGER  NOT NULL
                    )`
            );
            db.run(`CREATE TABLE IF NOT EXISTS Borrowed(
                        BorrowedId  INTEGER  PRIMARY KEY,
                        bookId      INTEGER  NOT NULL,
                        userId      INTEGER  NOT NULL,
                        dueDate     INTEGER  NOT NULL,
                        returned    INTEGER  NOT NULL CHECK (returned IN(0, 1)),

                        FOREIGN KEY(userId) REFERENCES User(userId),

                        FOREIGN KEY(bookId) REFERENCES Book(bookId)
                    )`
            );
        })
    }
})
module.exports = db;