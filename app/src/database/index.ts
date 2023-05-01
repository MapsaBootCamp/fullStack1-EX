import { PrismaClient, Role, User, Media } from "@prisma/client";

const db = new PrismaClient();

export { db, Role, User, Media };
