import { db, Media } from "../database";
import { MediaCreateI } from "../interfaces";

class MediaService {
  constructor() {}

  async all(): Promise<Media[]> {
    return await db.media.findMany();
  }

  async find(id: string): Promise<Media | null> {
    return await db.media.findUnique({
      where: {
        id,
      },
    });
  }

  async groupMediaByUser(): Promise<any> {
    return await db.media.groupBy({
      by: ["userId"],
      _sum: {
        size: true,
      },
      _count: {
        size: true,
      },
      _max: {
        size: true,
      },
      _min: {
        size: true,
      },
    });
  }

  async allUserMedias(userId: number): Promise<Media[]> {
    return await db.media.findMany({
      where: {
        userId,
      },
    });
  }

  async userUsedCapacity(userId: number): Promise<{ size: number }> {
    const { _sum } = await db.media.aggregate({
      _sum: {
        size: true,
      },
      where: {
        userId,
      },
    });
    return _sum;
  }

  async createMany(
    files: Express.Multer.File[],
    sumInputFilesSize: number,
    userId: number,
    userCapacity: number
  ) {
    return db.$transaction(async (db) => {
      //Check User Remaining Capacity
      const { size: userUsedCapacity } = await this.userUsedCapacity(userId);
      const remainingCapacity = userCapacity - userUsedCapacity;

      if (sumInputFilesSize > remainingCapacity) {
        throw new Error("Full Capacity");
      } else {
        const inputMedias: MediaCreateI[] = [];
        for (const file of files) {
          inputMedias.push({
            mimetype: file.mimetype,
            filename: file.filename,
            size: file.size ? file.size : 1,
            userId: userId,
          });
        }
        return await db.media.createMany({
          data: inputMedias,
        });
      }
    });
  }

  async delete(mediaId: string, userId: number) {
    return db.$transaction(async (db) => {
      // Check Media Belongs to User
      const media = await db.media.findMany({
        where: {
          id: mediaId,
          userId,
        },
      });

      if (media.length === 0) {
        throw new Error("Media doen't belong to user");
      } else {
        return await db.media.delete({
          where: {
            id: mediaId,
          },
        });
      }
    });
  }
}

export default MediaService;
