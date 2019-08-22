import { Request, Response, NextFunction } from "express";
import Technology from "../models/technology";
import { create } from "domain";

export default {
  async findAll(req: Request, res: Response) {
    const technologies = await Technology.find().sort({ createdAt: "desc" });
    return res.status(200).send({ data: technologies });
  },
  async findOne(req: Request, res: Response, next: NextFunction) {
    const technology = await Technology.findOne({ slug: req.params.slug });
    if (!technology) return next();
    return res.status(200).send({ data: technology });
  },
  async create(req: Request, res: Response) {
    //2do - validate prior to saving
    const technology = await new Technology({
      name: req.body.name
    }).save();

    return res
      .status(201)
      .send({ data: technology, message: "Technology created" });
  },
  async update(req: Request, res: Response, next: NextFunction) {
    const technology = await Technology.findOneAndUpdate(
      { slug: req.params.slug },
      { name: req.body.name },
      { new: true }
    );
    if (!technology) return next();
    return res
      .status(200)
      .send({ data: technology, message: "Technology was updated" });
  },
  async delete(req: Request, res: Response, next: NextFunction) {
    const technology = await Technology.findOneAndDelete({
      slug: req.params.slug
    });
    if (!technology) return next();
    return res.status(200).send({ message: "Technology deleted" });
  }
};
