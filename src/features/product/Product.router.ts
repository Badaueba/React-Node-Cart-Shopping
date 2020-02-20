import {Router} from "express"
import ProductController from "./Product.controller"

const routes = Router();
const controller = new ProductController();

routes.get("/", controller.get);
routes.post("/", controller.post);

export default routes;