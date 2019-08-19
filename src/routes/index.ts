import { Router, Request, Response } from "express";

const routes = () => {
  const api: Router = Router();
  //GET all
  //GET one
  //PUT
  //DELETE

  api.get("/", (req: Request, res: Response) => {
    res.send({
      message: "hello world!"
    });
  });

  return api;
};

export default routes;
