import { NextFunction, Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { updateImage } from '../../helpers/upload-file/update-file';
import { uploadFile } from '../../helpers/upload-file/upload-file';
import CategoryDto from '../../models/categoryDto';
import { ICategory } from '../../models/ICategory';
import CategoryService from '../services/category.service';

export default class CategoryController {
  private folder: string;
  private categorySvc: CategoryService;
  constructor() {
    this.folder = 'categories';
    this.categorySvc = new CategoryService();
  }
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { pageNumber, pageSize } = req.query;

      const categories = await this.categorySvc.getCategories({
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
      const categoryFound = await this.categorySvc.findCategory(Number(id));

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
      const total = await this.categorySvc.totalCategories();
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
        this.folder,
      );

      const category: Omit<ICategory, 'Id'> = {
        Name: req.body.name,
        Image: fileName ?? '',
        CreatedAt: new Date(),
      };

      await this.categorySvc.createCategory(category);
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

      const categoryFound = await this.categorySvc.findCategory(Number(id));

      if (!categoryFound) throw new Error('Not found');

      if (req.files) {
        newImage = await updateImage(
          req.files?.file as UploadedFile,
          categoryFound.Image,
          this.folder,
        );
      }

      const category: Omit<ICategory, 'CreatedAt'> = {
        Id: Number(id),
        Name: name ?? categoryFound.Name,
        Image: newImage ?? categoryFound.Image,
      };

      await this.categorySvc.updateCategory(category.Id, category);
      res.status(200).send({ mesage: 'Update Successfull' });
    } catch (error) {
      next(error);
    }
  }
}
