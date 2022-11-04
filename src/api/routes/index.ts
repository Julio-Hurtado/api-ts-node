/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response, Router } from 'express';
import CategoryRoutes from './category.routes';

export default class Routes {
  private _router: Router;
  private _categoryRoutes: CategoryRoutes;
  constructor() {
    this._router = Router();
    this._categoryRoutes = new CategoryRoutes();
  }

  public get router(): Router {
    this._router.use('/categories', this._categoryRoutes.routes);
    this._router.use(this.handlerGlobalError);
    return this._router;
  }
  private handlerGlobalError(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const code404 = 400;
    res.status(code404).send({ Error: err.message });
  }
}
