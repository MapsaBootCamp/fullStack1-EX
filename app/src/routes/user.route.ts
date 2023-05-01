import express, { Response, NextFunction } from "express";
import multer from "multer";
import he from "he";

import { UserService, MediaService } from "../services";
import { UserController } from "../controllers/";
import { auth, logAccess } from "../middlewares";
import { AuthRequest } from "../interfaces/";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req: AuthRequest, files, cb) => {
    cb(null, "storage/");
  },
  filename: (req, files, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const heFileName = he.encode(files.originalname);
    cb(null, uniqueSuffix + "-" + heFileName);
  },
});
const uploadMultipleFiles = multer({ storage });

const uploadAvatar = multer({ dest: "./public/images/" });

const userController = new UserController(
  new UserService(),
  new MediaService()
);

router.use(auth.authJWT, logAccess);
router.get("/", (req: AuthRequest, res: Response, next: NextFunction) => {
  userController.home(req, res, next);
});
router.get(
  "/users",
  auth.admin,
  (req: AuthRequest, res: Response, next: NextFunction) =>
    userController.index(req, res, next)
);
router.get(
  "/:id",
  auth.self,
  (req: AuthRequest, res: Response, next: NextFunction) =>
    userController.index(req, res, next)
);
router.post(
  "/avatar",
  uploadAvatar.single("avatar"),
  (req: AuthRequest, res: Response, next: NextFunction) =>
    userController.updateAvatar(req, res, next)
);
router.post(
  "/upload",
  uploadMultipleFiles.array("fileinput"),
  (req: AuthRequest, res: Response, next: NextFunction) =>
    userController.uploadFile(req, res, next)
);
router.get(
  "/:id/medias",
  auth.self,
  (req: AuthRequest, res: Response, next: NextFunction) =>
    userController.medias(req, res, next)
);
router.post(
  "/:id/medias",
  (req: AuthRequest, res: Response, next: NextFunction) =>
    userController.removeMedia(req, res, next)
);

export default router;
