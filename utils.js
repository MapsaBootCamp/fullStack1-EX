const fs = require("fs");
const { StatusCodes } = require("http-status-codes");

exports.openHtmlFile = (path, res) => {
  fs.readFile(path, (error, data) => {
    if (error) {
      res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR);
      res.end(`upload main page error : ${error.message}`);
    } else {
      res.writeHead(StatusCodes.OK);
      res.end(data);
    }
  });
};

exports.DataParseBody = (req) => {
  return new Promise((resolve) => {
    let body = [];
    req
      .on("data", (chunk) => body.push(chunk))
      .on("end", () => {
        body = Buffer.concat(body).toString();
        resolve(JSON.parse(body));
      });
  });
};
