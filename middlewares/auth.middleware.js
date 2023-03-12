const jwt = require("jsonwebtoken");
const { userService } = require("../modules/user");

const tokenAuthentication = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(403).json({
      errorMessage: "there is no token in headers",
    });
  }
  const token = authorization.includes("bearer")
    ? authorization.split(" ")[1]
    : authorization;

  try {
    const { email } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await userService.getByEmail(email);
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "invalid token" });
  }
};
module.exports = tokenAuthentication;
