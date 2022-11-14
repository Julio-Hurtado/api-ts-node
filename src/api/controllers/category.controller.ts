import { NextFunction, Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { updateImage } from '../../helpers/update-file';
import { uploadFile } from '../../helpers/upload-file';
import CategoryDto from '../../models/categoryDto';
import { ICategory } from '../../models/ICategory';
import CategoryService from '../services/category.service';

const folder = 'categories';

export default class CategoryController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { pageNumber, pageSize } = req.query;
      const service = new CategoryService();
      const categories = await service.getCategories({
        pageNumber: Number(pageNumber),
        pageSize: Number(pageSize),
      });

      res.status(200).send({
        body: categories.map(
          (cat) => new CategoryDto(cat.Id, cat.Name, cat.Image, cat.CreatedAt),
        ),
      });
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

      res.status(200).send({
        body: new CategoryDto(
          categoryFound.Id,
          categoryFound.Name,
          categoryFound.Image,
          categoryFound.CreatedAt,
        ),
      });
    } catch (error) {
      next(error);
    }
  }

  async totalCount(req: Request, res: Response, next: NextFunction) {
    try {
      const service = new CategoryService();
      const total = await service.totalCategories();
      res.status(200).send({ total: total[''] });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { files } = req;

      const fileName = await uploadFile(
        files?.file as UploadedFile,
        null,
        folder,
      );

      const service = new CategoryService();
      const category: Omit<ICategory, 'Id'> = {
        Name: req.body.name,
        Image: fileName ?? '',
        CreatedAt: new Date(),
      };

      await service.createCategory(category);
      res.status(201).send({ mesage: 'Created Ok' });
    } catch (error) {
      next(error);
    }
  }

  async put(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      let newImage!: string;

      const service = new CategoryService();
      const categoryFound = await service.findCategory(Number(id));

      if (!categoryFound) throw new Error('Not found');

      if (req.files) {
        newImage = await updateImage(
          req.files?.file as UploadedFile,
          categoryFound.Image,
          folder,
        );
      }

      const category: Omit<ICategory, 'CreatedAt'> = {
        Id: Number(id),
        Name: name ?? categoryFound.Name,
        Image: newImage ?? categoryFound.Image,
      };

      await service.updateCategory(category.Id, category);
      res.status(200).send({ mesage: 'Update Successfull' });
    } catch (error) {
      next(error);
    }
  }
}
