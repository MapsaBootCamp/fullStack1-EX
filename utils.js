exports.errResponse = (res, errorMessage) => {
  const result = {
    error: true,
    message: errorMessage,
  };
  return res.json(result);
};

exports.parseJsonBody = (req) => {
  return new Promise((resolve) => {
    let body = [];
    req
      .on("data", (chunk) => {
        body.push(chunk);
      })
      .on("end", () => {
        body = Buffer.concat(body).toString();
        resolve(JSON.parse(body));
      });
  });
};

exports.jsonSerialize = (data, res) => {
  res.end(JSON.stringify(data));
};

exports.parseQueryFromUrl = (url) => {
  if (!url) return {};
  return url.split("&").reduce((prevVal, currVal) => {
    const [key, val] = currVal.split("=");
    return { ...prevVal, [key]: val };
  }, {});
};