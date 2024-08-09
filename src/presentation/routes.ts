import { Router } from "express";
import { TodoRoutes } from "./todos/routes";

export class AppRouter {
  static get routes(): Router {
    const router = Router()
    return router.use('/api/todos', TodoRoutes.routes)
  }
}
