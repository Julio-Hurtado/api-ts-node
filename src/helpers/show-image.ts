import path from 'path';
import fs from 'fs';
import { findCategory } from './findCategory';

export const getImagePath = async (entity: string, id: number) => {
  let image: string | null;
  switch (entity) {
    case 'categories':
      {
        const category = await findCategory(id);
        if (!category) throw new Error('category not found');
        image = category.Image;
      }
      break;
    default:
      throw new Error('not implemented yet');
  }
  if (image) {
    const pathImg = path.join(__dirname, '../uploads', entity, image);
    if (fs.existsSync(pathImg)) {
      return pathImg;
    }
  }
  return null;
};
