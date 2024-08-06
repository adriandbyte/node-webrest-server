import { Router } from "express";
import { TodosController } from "./todos/controller";
import { TodoRoutes } from "./todos/routes";

export class AppRouter {
  static get routes(): Router {
    const router = Router()
    return router.use('/api/todos', TodoRoutes.routes)
  }
}
