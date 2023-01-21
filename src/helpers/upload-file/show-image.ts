import { findCategory } from '../findCategory';
import { getLocalPathImage } from '../find-path-image';

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
  const { path } = await getLocalPathImage(image, entity);
  return path;
};
