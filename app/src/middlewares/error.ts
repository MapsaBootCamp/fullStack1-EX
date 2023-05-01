import { Request, Response, NextFunction } from "express";

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  if (error) {
    return (
      res
        // .status(error.code || error.statusCode)
        .json({
          error: {
            status: true,
            // code: error.code || error.statusCode,
            message: error.message,
          },
        })
        .end()
    );
  } else {
    next(error);
  }
};

export { errorHandler };
