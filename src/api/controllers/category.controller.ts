import { NextFunction, Request, Response } from 'express';
import { ICategory } from '../../models/ICategory';
import CategoryService from '../services/category.service';

export default class CategoryController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { pageNumber, pageSize } = req.query;
      const service = new CategoryService();
      const categories = await service.getCategories({
        pageNumber: Number(pageNumber),
        pageSize: Number(pageSize),
      });

      res.status(200).send({ body: categories });
    } catch (error) {
      next(error);
    }
  }
  async find(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const service = new CategoryService();
      const categoryFound = await service.findCategory(Number(id));
      if (!categoryFound) throw new Error('Not found');
      res.status(200).send({ body: categoryFound });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, image } = req.body;
      const service = new CategoryService();
      const category: Omit<ICategory, 'Id'> = {
        Name: name,
        Image: image,
        CreatedAt: new Date(),
      };
      const newCategory = await service.createCategory(category);
      console.log(newCategory);
      res.status(201).send({ mesage: 'Created Ok' });
    } catch (error) {
      next(error);
    }
  }

  async put(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, image } = req.body;
      const service = new CategoryService();
      const categoryFound = await service.findCategory(Number(id));
      if (!categoryFound) throw new Error('Not found');

      const category: Omit<ICategory, 'CreatedAt'> = {
        Id: Number(id),
        Name: name ?? categoryFound.Name,
        Image: image ?? categoryFound.Image,
      };
      const categoryUpdated = await service.updateCategory(
        category.Id,
        category,
      );
      console.log(categoryUpdated);
      res.status(200).send({ mesage: 'Update Successfull' });
    } catch (error) {
      next(error);
    }
  }
}
