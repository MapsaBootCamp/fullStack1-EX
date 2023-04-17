import { ExpressLoader } from "./src/loaders";
import { prisma } from "./src/database";

// async function connectionCheck(): Promise<boolean> {
//   return mongooseDB
//     .then((value) => {
//       if (value.connection.readyState) {
//         return Promise.resolve(true);
//       } else {
//         return Promise.resolve(false);
//       }
//     })
//     .catch((error) => {
//       return Promise.reject(false);
//     });
// }

async function prismaConnectionCheck(): Promise<void> {
  await prisma.$connect();
}

(function main(): void {
  console.clear();
  prismaConnectionCheck()
    .then(async (): Promise<void> => {
      console.log("Database is connected");
      const app = new ExpressLoader();
      app.run();
    })
    .catch(async (e): Promise<void> => {
      console.error(e);
    });
})();
