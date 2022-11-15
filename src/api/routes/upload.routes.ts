import { Router } from 'express';
import UploadController from '../controllers/upload.controller';

export default class UploadRoutes {
  private _router: Router;
  private controller: UploadController;

  constructor() {
    this._router = Router();
    this.controller = new UploadController();
  }
  public get routes() {
    this._router.get('/:entity/:id', this.controller.uploadImage);
    return this._router;
  }
}
