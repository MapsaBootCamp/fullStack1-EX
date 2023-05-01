import { PrismaClient } from "@prisma/client";
import { UserCreateI } from "../../interfaces/user.interface";

const prisma: PrismaClient = new PrismaClient();

const users: UserCreateI[] = [
  {
    name: "ADMIN",
    email: "admin@yahoo.com",
    password: "$2b$12$sut.VttuceVeq.vGKVI/VuPPdo8EccchK4w.Szd9bhxFtXQGcsgGa", //password
    role: "ADMIN",
  },
  {
    name: "OPERATOR",
    email: "operator@yahoo.com",
    password: "$2b$12$sut.VttuceVeq.vGKVI/VuPPdo8EccchK4w.Szd9bhxFtXQGcsgGa", //password
    role: "OPERATOR",
  },
  {
    name: "CLIENT",
    email: "client@yahoo.com",
    password: "$2b$12$sut.VttuceVeq.vGKVI/VuPPdo8EccchK4w.Szd9bhxFtXQGcsgGa", //password
    role: "CLIENT",
  },
];

(async function main() {
  await prisma.user.createMany({
    data: users,
  });
})();
