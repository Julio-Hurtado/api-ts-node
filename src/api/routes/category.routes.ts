import { Router } from 'express';
import CategoryController from '../controllers/category.controller';
import { verifyPagination } from '../middlewares/verify-pagination';

export default class CategoryRoutes {
  private _router: Router;
  private controller: CategoryController;
  constructor() {
    this._router = Router();
    this.controller = new CategoryController();
  }

  public get routes() {
    this._router
      .get('/', verifyPagination, this.controller.get)
      .get('/:id', this.controller.find)
      .post('/', this.controller.create)
      .put('/:id', this.controller.put);
    return this._router;
  }
}
