const utils = require("./utils")
const url = require("url")

const routing = {
    GET : {},
    POST : {},
    PUT : {},
    DELETE : {}
}

exports.handler = async (req, res) => {
    try {
      
      req.path = url.parse(req.url).pathname;
      req.query = utils.parseQueryFromUrl(url.parse(req.url).query);
      
      res.json = (data) => utils.jsonSerialize(data, res);
      req.body = null;
  
      if (req.headers["content-type"] === "application/json")
        req.body = await utils.parseJsonBody(req);
      console.log("salam", req.method, req.path);
      routing[req.method][req.path](req, res);
      
    } catch (error) {
      console.log("Whaaaat", error.message);
      return utils.errResponse(res, error.message);
    }
  };

exports.get = (url, action) => {
    routing.GET[url] = action;
}
exports.post = (url, action) => {
    routing.POST[url] = action;
}
exports.put = (url, action) => {
    routing.PUT[url] = action;
}
exports.delete = (url, action) => {
    routing.DELETE[url] = action;
}