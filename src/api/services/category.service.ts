import SqlServer from '../../database/sqlServer';
import { ICategory } from '../../models/ICategory';
import { IPage } from '../../models/Ipage';

export default class CategoryService {
  private database;
  constructor() {
    this.database = new SqlServer();
  }

  async getCategories(page: IPage) {
    try {
      await this.database.connect();

      const { recordset } = await this.database.pool
        .request()
        .input('pageNumber', this.database.types.Int, page.pageNumber)
        .input('pageSize', this.database.types.Int, page.pageSize)
        .query<ICategory>(
          'Select Id,Name,Image,CreatedAt from Category Order By Id Offset @pageNumber Rows Fetch Next @pageSize Rows Only',
        );

      await this.database.close();
      return recordset;
    } catch (error: unknown) {
      await this.database.close();
      throw error;
    }
  }

  async findCategory(id: number) {
    try {
      await this.database.connect();

      const { recordset } = await this.database.pool
        .request()
        .input('Id', this.database.types.Int, id)
        .query<ICategory>(
          'Select Id,Name,Image,CreatedAt From Category Where Id=@Id',
        );

      await this.database.close();
      return recordset[0];
    } catch (error) {
      await this.database.close();
      throw error;
    }
  }
  async totalCategories() {
    try {
      await this.database.connect();
      const { recordset } = await this.database.pool
        .request()
        .query<Array<{ [total: string]: number }>>(
          'Select Count(Id) From Category',
        );
      await this.database.close();
      return recordset[0];
    } catch (error) {
      await this.database.close();
      throw error;
    }
  }
  async createCategory(data: Omit<ICategory, 'Id'>) {
    try {
      await this.database.connect();

      const request = await this.database.pool
        .request()
        .input('Name', this.database.types.VarChar(50), data.Name)
        .input('Image', this.database.types.VarChar(50), data.Image)
        .input('CreatedAt', this.database.types.DateTime, data.CreatedAt)
        .query<ICategory>(
          'Insert into Category(Name,Image,CreatedAt) values (@Name,@Image,@CreatedAt)',
        );

      await this.database.close();
      return request;
    } catch (error: unknown) {
      await this.database.close();
      throw error;
    }
  }

  async updateCategory(id: number, data: Partial<ICategory>) {
    try {
      await this.database.connect();

      const request = await this.database.pool
        .request()
        .input('Id', this.database.types.Int, id)
        .input('Image', this.database.types.VarChar(50), data.Image)
        .input('Name', this.database.types.VarChar(50), data.Name)
        .query('Update Category Set Name=@Name, Image=@Image Where Id=@Id');

      await this.database.close();
      return request;
    } catch (error) {
      await this.database.close();
      throw error;
    }
  }
}
