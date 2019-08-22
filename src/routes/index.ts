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
  api.post("/", catchAsyncDecorator(technologyController.create));
  //UPDATE
  api.put("/:slug", catchAsyncDecorator(technologyController.update));
  //DELETE

  return api;
};

export default routes;
