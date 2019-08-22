import { Router } from "express";
import technologyController from "../controllers/technologyController";
import { catchAsyncDecorator } from "../middleware/errorHandlers";

const routes = () => {
  const api: Router = Router();
  //GET all
  api.get("/", catchAsyncDecorator(technologyController.findAll));
  //GET one
  api.get("/:slug", catchAsyncDecorator(technologyController.findOne));
  //PUT
  //DELETE

  return api;
};

export default routes;
