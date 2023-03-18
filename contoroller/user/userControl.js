const userService = require("./userService");
const bcrypt = require("bcrypt");

const userControl = {
  get: async (req, res) => {
    const { id } = req.params;

    const user = await userService.getById(+id);
    return res.json(user);
  },
  getAll: async (req, res) => {
    const all = await userService.getAll();
    return res.json(all);
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await userService.update(id, req.body);
      return res.status(202).json(updated);
    } catch (error) {
      return res.json({
        error: true,
        message: error.message,
      });
    }
  },
  create: async (req, res) => {
    try {
      const { password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const passwordPlus = await bcrypt.hash(password, salt);

      const newUser = await userService.create({
        ...req.body,
        password: passwordPlus,
      });

      return res.status(201).json(newUser);
    } catch (error) {
      return res.json({
        error: true,
        message: error.message,
      });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await userService.delete(id);
      res.status(205).json(deletedUser);
    } catch (error) {
      return res.json({
        error: true,
        message: error.message,
      });
    }
  },
};
module.exports = userControl;
