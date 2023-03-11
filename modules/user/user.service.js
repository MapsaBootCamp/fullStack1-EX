const db = require("../../db");

function createPermittedData(data) {
  const result = {};
  const permittedKeyChange = ["email", "password", "sex", "name"];
  for (const key of permittedKeyChange) {
    if (data.hasOwnProperty(key)) {
      if (key === "sex") {
        result[key] = data[key] ? true : false;
        continue;
      }
      result[key] = data[key];
    }
  }
  return result;
}

function updatePermittedData(data) {
  try {
    const result = {};
    const permittedKeyChange = ["password", "sex"];

    for (const key of permittedKeyChange) {
      if (data.hasOwnproperty(key)) {
        if (key === "sex") {
          result[key] = data[key] ? true : false;
          continue;
        }
        result[key] = data[key];
      }
    }
    return result;
  } catch (error) {
    return new Error(error.message);
  }
}

const userService = {
  getById: async (id) => {
    try {
      return await db.user.findUnique({
        where: { id: parseInt(id) },
      });
    } catch (error) {
      return new Error(error.message);
    }
  },
  getByEmail: async (email) => {
    try {
      return await db.user.findUnique({
        where: {
          email,
        },
      });
    } catch (error) {
      return new Error(error.message);
    }
  },
  getAll: async () => {
    return db.user.findMany();
  },

  create: async (data) => {
    try {
      const user = await db.user.create({
        data: createPermittedData(data),
      });
      return user.id;
    } catch (error) {
      return new Error(error.message);
    }
  },
  update: async (id, data) => {
    try {
      const result = await db.user.update({
        where: {
          id: parseInt(id),
        },
        data: updatePermittedData(data),
      });
      return result;
    } catch (error) {
      return new Error(error.message);
    }
  },

  delete: async (id) => {
    try {
      return await db.user.delete({
        where: {
          id: parseInt(id),
        },
      });
    } catch (error) {
      return new Error(error.message);
    }
  },
};

module.exports = userService;
