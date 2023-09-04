import { Errback, NextFunction, Request, Response } from "express";

// This middleware kicks in when the route is not found
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  let error = new Error(`Route Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// overriding default experess error handler
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  //checking for cast error from mongoose
  if (err.name === "CastError") {
    (message = "resource not found"), (statusCode = 404);
  }
  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
