import { Router } from 'express';
import CategoryController from '../controllers/category.controller';

export default class CategoryRoutes {
  private _router: Router;
  private controller: CategoryController;
  constructor() {
    this._router = Router();
    this.controller = new CategoryController();
  }

  public get routes() {
    this._router.get('/', this.controller.get);
    return this._router;
  }
}
