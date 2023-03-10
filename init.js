require("dotenv").config();
globalThis.utils = require("./utils/utils");
globalThis.logger = require("./utils/logger")
const serverApp = require("./server/server")

const loggerInvokeResult = logger.init();

if (loggerInvokeResult) {
    logger.log(loggerInvokeResult);


}

// dependencies


// start server

if (!serverApp.initConfig().startServer(process.env.PORT)) {
    logger.log("server shutdown...")
} else {

}