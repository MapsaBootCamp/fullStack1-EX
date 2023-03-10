const { StatusCodes } = require("http-status-codes");
const { DataParseBody } = require("./utils");

const routing = {
  GET: {},
  POST: {},
};

exports.handler = async (req, res) => {
  try {
    // req.body = null;
    console.log(req.headers["content-type"]);
    if (req.headers["content-type"] === "application/json")
      req.body = await DataParseBody(req);
    routing[req.method][req.url](req, res);
  } catch (error) {
    res.writeHead(StatusCodes.NOT_FOUND);
    res.end(`error! ${error.message}`);
    console.error(`error! ${error.message}`);
  }
};

exports.get = (url, action) => {
  routing.GET[url] = action;
};
