import db from "./db.js";

async function main() {
  const user1 = await db.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "John",
    },
  });

  const user2 = await db.user.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: "William",
    },
  });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
