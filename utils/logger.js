const fileLogger = require("./loggers/fileLogger")
const consoleLogger = require("./loggers/consoleLogger");

const loggers = [];


function log(data) {
    loggers.forEach(logger => { logger.log(data); });
};

function logArray(dataArray) {
    loggers.forEach(logger => { logger.logArray(dataArray); });
}


const init = function () {

    let startLoggingMessage = "";

    if (process.env.LOGFILE) {
        if (fileLogger.init(process.env.LOGPATH,process.env.LOGFILLEFORMAT)) {
            loggers.push(fileLogger);
        }
        else {
            startLoggingMessage += fileLogger.getError();
        }
    }

    if (process.env.LOGCONSOLE) {
        loggers.push(consoleLogger);
    }

    return startLoggingMessage; 
}


module.exports = {
    init,
    log,
    logArray
}