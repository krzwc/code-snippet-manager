import { Router } from "express";
import technologyController from "../controllers/technologyController";
import snippetsController from "../controllers/snippetsController";
import { catchAsyncDecorator } from "../middleware/errorHandlers";

const routes = () => {
  const api: Router = Router();
  //GET all
  api.get("/", catchAsyncDecorator(technologyController.findAll));
  //GET one
  api.get("/:slug", catchAsyncDecorator(technologyController.findOne));
  //PUT
  api.post(
    "/",
    technologyController.validate,
    technologyController.verifyValidation,
    catchAsyncDecorator(technologyController.create)
  );
  //UPDATE
  api.put(
    "/:slug",
    technologyController.validate,
    technologyController.verifyValidation,
    catchAsyncDecorator(technologyController.update)
  );
  //DELETE
  api.delete("/:slug", catchAsyncDecorator(technologyController.delete));

  api.get(
    "/:slug1/:slug2",
    catchAsyncDecorator(snippetsController.findOneByTech)
  );
  api.post(
    "/:slug",
    snippetsController.validate,
    snippetsController.verifyValidation,
    catchAsyncDecorator(snippetsController.create)
  );
  api.put(
    "/:slug1/:slug2",
    snippetsController.validate,
    snippetsController.verifyValidation,
    catchAsyncDecorator(snippetsController.update)
  );
  api.delete("/:slug1/:slug2", catchAsyncDecorator(snippetsController.delete));

  return api;
};

export default routes;
