const quizService = require("./quizService");

const quizControl = {
  get: async (req, res) => {
    try {
      const { id } = req.params;

      const question = await quizService.getById(+id);
      return res.json(question);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },

  getAll: async (req, res) => {
    try {
      const all = await quizService.getAll(req.query);
      return res.json(all);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
};

module.exports = quizControl;
