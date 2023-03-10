const sqlite = require("sqlite3").verbose();

const DBFILE = "DBFILE.LIBRARY";

const db = new sqlite.Database(DBFILE, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("data base created!");

    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS book(
        bookID INTEGER PRIMARY KEY UNIQUE,
        nameBOOK TEXT NOT NULL UNIQUE,
        numberBOOK INTEGER NOT NULL
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS user(
        userID INTEGER PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password INTEGER
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS exchange(
              bookID INTEGER,
              userID INTEGER,
              PRIMARY KEY(bookID,userID),
              FOREIGN KEY (bookID)
                   REFERENCES book(bookID)
                   ON DELETE CASCADE 
                   ON UPDATE CASCADE,
                FOREIGN KEY (userID)
                   REFERENCES user(userID)
                   ON DELETE CASCADE 
                   ON UPDATE CASCADE
        )`);
    });
  }
});
module.exports = db;
