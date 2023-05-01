import { db, User } from "../database";

class UserService {
  constructor() {}

  async all(): Promise<User[]> {
    return await db.user.findMany();
  }

  async find(id: number): Promise<User | null> {
    return await db.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await db.user.findUnique({
      where: {
        email,
      },
    });
  }

  async updateAvatar(id: number, avatarUrl: string): Promise<User> {
    return await db.user.update({
      where: {
        id,
      },
      data: {
        avatarUrl,
      },
    });
  }
}

export default UserService;
