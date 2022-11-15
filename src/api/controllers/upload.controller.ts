import { NextFunction, Request, Response } from 'express';
import { getImagePath } from '../../helpers/show-image';

export default class UploadController {
  async uploadImage(req: Request, res: Response, next: NextFunction) {
    try {
      const { entity, id } = req.params;
      const pathImage = await getImagePath(entity as string, Number(id));
      if (!pathImage) throw new Error('image not found');

      res.status(200).sendFile(pathImage);
    } catch (error) {
      next(error);
    }
  }
}
