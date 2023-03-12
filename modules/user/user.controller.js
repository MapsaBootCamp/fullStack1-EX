const userService = require("./user.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {
  get: async (req, res) => {
    const { id } = req.params;
    const user = await userService.getById(id);
    if (!user) {
      return res.end(`chenin useri ba id: ${id} nadarim`);
    } else {
      return res.json(user);
    }
  },
  getAll: async (req, res) => {
    const users = await userService.getAll();
    if (users.length === 0) {
      return res.send("user list is empty");
    } else {
      return res.json(users);
    }
  },
  create: async (req, res) => {
    try {
      console.log("in create controller");
      const { password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);
      const userId = await userService.create({
        ...req.body,
        password: hashedPass,
      });
      console.log(userId);
      return res.status(201).send({ userId });
    } catch (error) {
      return res.send({
        error: true,
        message: error.message,
      });
    }
  },
  update: async(req, res) => {
    const {id} = req.params;
    const result = await userService.update(id, req.body)
    return res.json(result)
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userService.getByEmail(email);
      if (!user) {
        return res.status(403).json({
          message: "invalid email",
        });
      }
      console.log("pass", password);
      console.log("db pass", user.password);

      const validPass = await bcrypt.compare(password, user.password);
      if (!validPass) {
        return res.status(403).json({
          message: "invalid password",
        });
      }

      const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, {
        expiresIn: Number(process.env.TOKEN_EXPIRE_TIME),
      });
      return res.json({
        access_token: token,
      });
    } catch (error) {
      return res.json({
        error: true,
        message: error.message,
      });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.body;
      const result = await userService.delete(id);
      return res.status(204).json(result);
    } catch (error) {
      return res.json({ error: true, message:error.message });
    }
  },
};

module.exports = userController;
