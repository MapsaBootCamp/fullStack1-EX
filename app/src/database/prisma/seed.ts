import { PrismaClient, Todo, Role, Status } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

type UserCreateI = {
  name: string;
  phone: string;
  password: string;
  role?: Role;
};

type TodoCreateI = {
  title: string;
  dueDate: Date;
  status: Status;
  userId: number;
};

const users: UserCreateI[] = [
  {
    name: "Mohammad",
    phone: "09121001001",
    password: "$2b$12$sut.VttuceVeq.vGKVI/VuPPdo8EccchK4w.Szd9bhxFtXQGcsgGa", //password
    role: "ADMIN",
  },
  {
    name: "Amin",
    phone: "09121001002",
    password: "$2b$12$sut.VttuceVeq.vGKVI/VuPPdo8EccchK4w.Szd9bhxFtXQGcsgGa", //password
    role: "OPERATOR",
  },
  {
    name: "Raha",
    phone: "09121001003",
    password: "$2b$12$sut.VttuceVeq.vGKVI/VuPPdo8EccchK4w.Szd9bhxFtXQGcsgGa", //password
    role: "CLIENT",
  },
];

const todos: TodoCreateI[] = [
  {
    title: "Task 1",
    dueDate: new Date("2023-04-18"),
    status: "PROGRESS",
    userId: 3,
  },
  {
    title: "Task 2",
    dueDate: new Date("2023-04-20"),
    status: "PROGRESS",
    userId: 3,
  },
  {
    title: "Task 3",
    dueDate: new Date("2023-04-23"),
    status: "PROGRESS",
    userId: 3,
  },
  {
    title: "Shopping",
    dueDate: new Date("2023-04-20"),
    status: "PROGRESS",
    userId: 2,
  },
  {
    title: "Fixing",
    dueDate: new Date("2023-04-23"),
    status: "PROGRESS",
    userId: 2,
  },
];

(async function main() {
  await prisma.user.createMany({
    data: users,
  });
  await prisma.todo.createMany({
    data: todos,
  });
})();
