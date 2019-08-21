import { Request, Response, NextFunction } from "express";
import { Error } from "./types";

export const catchAsyncDecorator = fn => (
  req: Request,
  res: Response,
  next: NextFunction
) => fn(req, res, next).catch((err: Error) => next(err));
