require("dotenv").config()
globalThis.utils = require("./utils/utils");

const logger = require("./utils/logger")


const loggerInvokeResult = logger.init();
globalThis.logger = logger;


if (loggerInvokeResult) {
    logger.log(loggerInvokeResult);
}





server.listen(process.env.PORT)