/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response, Router } from 'express';
import { AuthRoutes } from './auth.routes';
import CategoryRoutes from './category.routes';
import UploadRoutes from './upload.routes';

export default class Routes {
  private _router: Router;
  private _categoryRoutes: CategoryRoutes;
  private _uploadRoutes: UploadRoutes;
  private _authRoutes: AuthRoutes;
  constructor() {
    this._router = Router();
    this._categoryRoutes = new CategoryRoutes();
    this._uploadRoutes = new UploadRoutes();
    this._authRoutes = new AuthRoutes();
  }

  public get router(): Router {
    this._router.use('/categories', this._categoryRoutes.routes);
    this._router.use('/upload', this._uploadRoutes.routes);
    this._router.use('/auth', this._authRoutes.routes);
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
