import * as fs from "fs";
import { Response, NextFunction } from "express";

import { MediaService, UserService } from "../services";
import { MediaCreateI, AuthRequest, ErrorI } from "../interfaces";
import config from "../config";
import { gigToBytes } from "../utilities";

class UserController {
  private userService: UserService;
  private mediaService: MediaService;
  constructor(userService: UserService, mediaService: MediaService) {
    this.userService = userService;
    this.mediaService = mediaService;
    if (!fs.existsSync(config.__basedirStorage)) {
      fs.mkdirSync(config.__basedirStorage);
    }
  }

  sumInputFilesSize(inputFiles: Express.Multer.File[]): number {
    return inputFiles.reduce((preVal, curVal) => {
      return preVal + curVal.size ? curVal.size : 1;
    }, 0);
  }

  async home(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { size: userUsedCapacity } =
        await this.mediaService.userUsedCapacity(req.user.id);
      const usedCpacityPercent =
        (userUsedCapacity * 100) / gigToBytes(req.user.capacity);
      const filesList = await this.mediaService.allUserMedias(req.user.id);

      res.render("home", {
        pageTitle: "Dashboard",
        name: req.user.name,
        avatar: req.user.avatarUrl
          ? "images/" + req.user.avatarUrl
          : "avatar.png",
        usedCpacityPercent: Math.ceil(usedCpacityPercent),
        capacity: req.user.capacity,
        userUsedCapacity,
        filesList,
      });
    } catch (error) {
      next(error);
    }
  }

  async index(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const id = req.params.id;
      if (id === undefined) {
        const users = await this.userService.all();
        return res.json(users).end();
      } else {
        const user = await this.userService.find(parseInt(id));
        if (user) {
          return res.json(user).end();
        }
      }
      return res.sendStatus(404);
    } catch (error) {
      next(error);
    }
  }

  async updateAvatar(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const file = req.file;
      if (file) {
        if (file.mimetype.includes("image")) {
          try {
            if (!fs.existsSync(config.__basedirAvatar)) {
              fs.mkdirSync(config.__basedirAvatar);
            }
            fs.unlinkSync(config.__basedirAvatar + req.user.avatarUrl);
          } catch (error) {}

          await this.userService.updateAvatar(req.user.id, file.filename);

          return res.status(201).redirect("/");

          // return res.status(201).json({
          //   file: file.path,
          //   status: "success",
          // });
        } else {
          const error: ErrorI = new Error();
          error.code = 400;
          error.message = "Invalid Image";
          next(error);
        }
      } else {
        const error: ErrorI = new Error();
        error.code = 400;
        error.message = "Put Image File In Header";
        next(error);
      }
    } catch (error) {
      error.code = 400;
      error.message = "Invalid Request!";
      next(error);
    }
  }

  async uploadFile(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const sumInputFilesSize = this.sumInputFilesSize(req.files);

    try {
      await this.mediaService.createMany(
        req.files,
        sumInputFilesSize,
        req.user.id,
        gigToBytes(req.user.capacity)
      );
      const userStorage: string = config.__basedirStorage + req.user.id + "/";

      if (!fs.existsSync(userStorage)) {
        fs.mkdirSync(userStorage);
      }

      for (const file of req.files) {
        fs.rename(
          config.__basedirStorage + file.filename,
          userStorage + file.filename,
          (err) => {
            if (err) {
              throw err;
            }
          }
        );
      }

      // return res.end("Files uploaded successfully");
      return res.redirect("/");
    } catch (error) {
      for (const file of req.files) {
        fs.unlink(config.__basedirStorage + file.filename, (err) => {
          if (err) {
            throw new Error(err.message);
          }
        });
      }
      return next(error);
    }
  }

  async medias(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const id = req.params.id;
      await this.userService.find(parseInt(id));
      const medias = await this.mediaService.allUserMedias(parseInt(id));
      return res.json(medias);
    } catch (error) {
      next(error);
    }
  }

  async removeMedia(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const id = req.params.id;

      const deletedMedia = await this.mediaService.delete(id, req.user.id);
      const userStorage: string = config.__basedirStorage + req.user.id + "/";

      fs.unlink(userStorage + deletedMedia.filename, (err) => {
        if (err) {
          throw new Error(err.message);
        }
      });

      return res.status(204).redirect("/");
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
