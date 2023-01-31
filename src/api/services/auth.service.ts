import { MAX } from 'mssql';
import SqlServer from '../../database/sqlServer';
import { IUser } from '../../models/IUser';

export class AuthService {
  private db;
  constructor() {
    this.db = new SqlServer();
  }

  async getById(id: number) {
    try {
      await this.db.connect();
      const { recordset } = await this.db.pool
        .request()
        .input('id', this.db.types.Int, id)
        .query<Omit<IUser, 'Password'>>(
          'Select Id,Name,Email,Rol,CreatedAt From AuthUser Where Id=@id',
        );

      await this.db.close();
      return recordset[0];
    } catch (error: unknown) {
      await this.db.close();
      throw error;
    }
  }
  async find(email: string) {
    try {
      await this.db.connect();
      const { recordset } = await this.db.pool
        .request()
        .input('email', this.db.types.VarChar(50), email)
        .query<Pick<IUser, 'Id' | 'Email' | 'Password'>>(
          'Select Id,Email,Password From AuthUser Where Email=@email',
        );

      await this.db.close();
      return recordset[0];
    } catch (error: unknown) {
      await this.db.close();
      throw error;
    }
  }

  async create(user: Omit<IUser, 'Id'>) {
    try {
      await this.db.connect();
      const { recordset } = await this.db.pool
        .request()
        .input('name', this.db.types.VarChar(50), user.Name)
        .input('email', this.db.types.VarChar(50), user.Email)
        .input('password', this.db.types.VarChar(MAX), user.Password)
        .input('rol', this.db.types.VarChar(20), user.Rol)
        .input('createdAt', this.db.types.DateTime, user.CreatedAt)
        .query<{ Identity: number }>(
          'Insert into AuthUser(Name,Email,Password,Rol,CreatedAt) values (@name,@email,@password,@rol,@createdAt); select @@IDENTITY as "Identity" ',
        );

      await this.db.close();
      return recordset[0];
    } catch (error) {
      await this.db.close();
      throw error;
    }
  }
}
