const db = require("../../db");

const quizService = {
  getById: async (id) => {
    const question = await db.question.findFirst({
      where: {
        data: id,
      },
      select: {
        id: true,
        content: true,
        level: true,
        a: true,
        b: true,
        c: true,
        d: true,
        quiz: {
          select: {
            id: true,
            userId: true,
          },
        },
      },
    });
    return question;
  },

  getAll: async (query) => {
    const { categoryQ } = query;
    return await db.question.findMany({
      where: {
        category: {
          title: categoryQ,
        },
      },
    });
  },
};

module.exports = quizService;
