const express = require("express");
const path = require("path")

const app = express();

const startServer = function (port) {
    try {
        app.listen(port, () => logger.log(`server is listening on localhost:${port}...`));
        return true;
    } catch (error) {
        logger.log(`cant start server. Error: ${error.message}`)
    }
};

const initConfig = function () {
    app.set("view engine", "ejs");
    // app.engine("ejs", require("ejs").);
    app.use("/assets", express.static("public"));
    app.use(express.json());

    app.get("/", (req, res) => {
        logger.log("request to '/'");
        res.render("index",{age:11});
    });



    return module.exports;
}

module.exports = {
    app,
    startServer,
    initConfig
}


