import Technology from "../models/technology";
import Snippet from "../models/snippet";
import { Request, Response, NextFunction } from "express";

export default {
  async findOneByTech(req: Request, res: Response, next: NextFunction) {
    const technology = await Technology.findOne({ slug: req.params.slug1 });
    const snippetByTechnologyAndSlug = await Snippet.find({
      technology: technology._id,
      slug: req.params.slug2
    });
    if (!technology) return next();

    return res.status(200).send({ data: { snippetByTechnologyAndSlug } });
  }
};
