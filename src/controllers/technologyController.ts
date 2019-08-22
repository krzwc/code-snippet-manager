import { Request, Response, NextFunction } from "express";
import Technology from "../models/technology";

export default {
  async findAll(req: Request, res: Response) {
    const technologies = await Technology.find().sort({ createdAt: "desc" });
    return res.status(200).send({ data: technologies });
  },
  async findOne(req: Request, res: Response, next: NextFunction) {
    const technology = await Technology.findOne({ slug: req.params.slug });
    if (!technology) return next();
    return res.status(200).send({ data: technology });
  }
};
