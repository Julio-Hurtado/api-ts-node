import { NextFunction, Response } from 'express';
import { AuthRequest } from '../../models/authRequest';
import Jwt from '../../utils/jwt';

export const isAuthenticated = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = await Jwt.verifyToken(req);

    req.authUser = { Id: userId };
    next();
  } catch (error) {
    next(error);
  }

  //   new Error('Unauthorized')
};
