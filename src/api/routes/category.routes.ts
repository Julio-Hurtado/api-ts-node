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
      .get('/', verifyPagination, (req, res, next) =>
        this.controller.get(req, res, next),
      )
      .get('/total', (req, res, next) =>
        this.controller.totalCount(req, res, next),
      )
      .get('/:id', (req, res, next) => this.controller.find(req, res, next))
      .post('/', (req, res, next) => this.controller.create(req, res, next))
      .put('/:id', (req, res, next) => this.controller.put(req, res, next));
    return this._router;
  }
}
