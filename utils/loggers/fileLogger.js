const fs = require("node:fs");

let filePath = "";
let errorMessage = "";
let logFileFormat = "YYYY-MM-DD HH:MM:SS"


const getDateTime = () => new Date().toUTCString().slice(5, 25);


function init(logPath = "logs", logFileFormat = "YYYY-MM-DD hh:mm:ss") {
    const initTime = new Date();

    if (!fs.existsSync(logPath))
        fs.mkdirSync(logPath);

    filePath = logFileFormat? `${logPath}/${globalThis.utils.getDateInFormat(initTime,logFileFormat)}.txt` :`${logPath}/log.txt`;

    try {
        fs.appendFileSync(filePath, `init logging libr4ry server on ${initTime}\n`,{encoding:"utf-8"});
        return true;
    } catch (error) {
        errorMessage = error.message;
    }
}

const log = async function (data) {
    await fs.appendFile(filePath,
        `${getDateTime()} > ${data}\n`,
        "utf-8",
        (err) => {
            if (err) {
                // console.log("Cant log", err);
            }
        });

}

const logArray = async function (dataArray) {
    let data = dataArray.reduce((pre, cur, curI) => `${pre}\t\t${curI}: ${cur}\n`
        , `${getDateTime()} > arrays of data
=====================================\n`);
    await fs.appendFile(filePath,
        data + "=====================================\n",
        "utf-8",
        (err) => {
            if (err) {
                // console.log("Cant log", err);
            }
        });

}

const getError = function () { return errorMessage; }

module.exports = {
    init,
    log,
    logArray,
    getError
}