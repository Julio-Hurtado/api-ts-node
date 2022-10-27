import { NextFunction, Request, Response } from 'express';

export default class CategoryController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).send({ mesage: 'hello from category' });
    } catch (error) {
      next(error);
    }
  }
}
