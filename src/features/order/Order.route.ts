import {Router} from "express";
import OrderController from './Order.controller';

const routes = Router();
const controller = new OrderController();

routes.get("/", controller.get)
routes.get("/:_id", controller.getOne)
routes.post("/", controller.post)
routes.delete("/:_id", controller.delete)
routes.put("/:_id", controller.put)
routes.put("/finish/:_id", controller.finish)


export default routes;