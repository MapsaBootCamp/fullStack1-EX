const db = require("../../db");

const checkPermitedData = function (data) {
  const result = {};
  const permited = ["email", "password"];
  for (const prop of permited) {
    if (data.hasOwnProperty(prop)) {
      //   data[prop] != null ? data[prop] : undefined;
      result[prop] = data[prop];
    }
  }
  return result;
};

const userService = {
  getById: async (id) => {
    return await db.User.findUnique({
      where: { id },
    });
  },
  getAll: async () => {
    return await db.User.findMany();
  },
  create: async (data) => {
    try {
      const valid = checkPermitedData(data);
      const user = await db.user.create({
        data: valid,
      });
      return user;
    } catch (error) {
      console.error(error.messages);
      throw new Error(error.message);
    }
  },
  update: async (id, data) => {
    try {
      const valid = checkPermitedData(data);
      const upUser = await db.user.update({
        where: { id: +id },
        data: valid,
      });
      return upUser;
    } catch (error) {
      console.error(error.messages);
      throw new Error(error.message);
    }
  },
  delete: async (id) => {
    try {
      return await db.User.delete({
        where: { id: +id },
      });
    } catch (error) {
      console.error(error.messages);
      throw new Error(error.message);
    }
  },
};
module.exports = userService;
