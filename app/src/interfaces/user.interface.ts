import { Role, User } from "../database";

type UserCreateI = {
  name: string;
  email: string;
  password: string;
  role?: Role;
};

type UserOutputI = {
  id: number;
  name: string;
  email: string;
  // password: string;
  role: Role;
  avatarUrl?: string;
  capacity: number;
  createdAt: Date;
  updatedAt: Date;
};

export { UserCreateI, UserOutputI };
