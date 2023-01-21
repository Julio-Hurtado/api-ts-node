import { Request } from 'express';
import { IUser } from './IUser';

export interface AuthRequest extends Request {
  user?: Omit<IUser, 'Id'>;
  authUser?: Pick<IUser, 'Id'>;
}
