import CategoryService from '../api/services/category.service';

export const findCategory = async (id: number) => {
  const service = new CategoryService();
  const category = await service.findCategory(id);
  return category;
};
