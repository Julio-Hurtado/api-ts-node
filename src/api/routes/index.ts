import { Router } from 'express';
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
    return this._router;
  }
}
