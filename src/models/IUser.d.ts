export interface IUser {
  Id: number;
  Name: string;
  Email: string;
  Password: string;
  Rol: 'admin_rol' | 'user_rol';
  CreatedAt: Date;
}
