import Technology from "../models/technology";
import Snippet from "../models/snippet";
import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

export default {
  async findOneByTech(req: Request, res: Response, next: NextFunction) {
    const technology = await Technology.findOne({ slug: req.params.slug1 });
    const snippetByTechnologyAndSlug = await Snippet.find({
      technology: technology._id,
      slug: req.params.slug2
    });
    if (!technology) return next();

    return res.status(200).send({ data: { snippetByTechnologyAndSlug } });
  },
  async create(req: Request, res: Response) {
    //2do - validate prior to saving
    const technology = await Technology.findOne({ slug: req.params.slug });
    const snippet = await new Snippet({
      code: req.body.code,
      description: req.body.description,
      technology: technology.id
    }).save();

    return res.status(201).send({ data: snippet, message: "Snippet created" });
  },
  async update(req: Request, res: Response, next: NextFunction) {
    //2do - validate prior to saving
    const technology = await Technology.findOne({ slug: req.params.slug1 });
    const snippet = await Snippet.findOneAndUpdate(
      { slug: req.params.slug2 },
      {
        code: req.body.code,
        description: req.body.description,
        technology: req.body.technology ? req.body.technology : technology.id
      },
      { new: true }
    );
    if (!snippet) return next();

    return res
      .status(200)
      .send({ data: snippet, message: "Snippet was updated" });
  },
  async delete(req: Request, res: Response, next: NextFunction) {
    const snippet = await Snippet.findOneAndDelete({
      slug: req.params.slug2
    });
    if (!snippet) return next();
    return res.status(200).send({ message: "Snippet deleted" });
  },
  validate: [
    check("code").isLength({ min: 1 }),
    check("description").isLength({ min: 1 })
  ],
  verifyValidation(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    //obiekt errors pusty
    next();
  }
};
