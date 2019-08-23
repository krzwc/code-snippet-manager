import { Request, Response, NextFunction } from "express";
import Technology from "../models/technology";
import Snippet from "../models/snippet";

export default {
  async findAll(req: Request, res: Response) {
    const technologies = await Technology.find().sort({ name: "desc" });
    const snippets = await Snippet.find();
    return res.status(200).send({ data: { technologies, snippets } });
  },
  async findOne(req: Request, res: Response, next: NextFunction) {
    const technology = await Technology.findOne({ slug: req.params.slug });
    const snippetsByTechnology = await Snippet.find({
      technology: technology._id
    });
    if (!technology) return next();
    return res.status(200).send({ data: { technology, snippetsByTechnology } });
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
    //2do - validate prior to saving
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
