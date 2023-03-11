const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const seedUser = [
  {
    email: "as@qw.com",
    password: "1234",
    score: 0,
  },
  {
    email: "zx@cd.com",
    password: "5678",
    score: 0,
  },
];

const seedQuiz = [
  {
    title: "varzeshi",
    question: {
      create: [
        {
          content: "olampic tokiu dar kodam keshvar bargozar shod?",
          level: "asoon",
          a: "japon",
          b: "iran",
          c: "sudan",
          d: "china",
          correctAnswer: "japon",
        },
        {
          content: "gahraman worldCup 2022 che timi bood?",
          level: "mamooli",
          a: "argentina",
          b: "america",
          c: "france",
          d: "germany",
          correctAnswer: "argentina",
        },
      ],
    },
    title: "cinema",
    question: {
      create: [
        {
          content: "kargardan film avatar 2 kist?",
          level: "mamooli",
          a: "cameron",
          b: "modiri",
          c: "lopez",
          d: "johnson",
          correctAnswer: "cameron",
        },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const user of seedUser) {
    const userObj = await prisma.User.create({
      data: user,
    });
    console.log(`create user with ${userObj.id}`);
  }
  for (const q of seedQuiz) {
    const quizObj = await prisma.quiz.create({
      data: q,
    });
    console.log(`create quize with ${quizObj.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
