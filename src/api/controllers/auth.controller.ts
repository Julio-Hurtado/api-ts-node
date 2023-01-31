import { NextFunction, Request, Response } from 'express';
import { AuthRequest } from '../../models/authRequest';
import { IUser } from '../../models/IUser';
import { AuthService } from '../services/auth.service';
import UserDto from '../../models/userDto';
import Jwt from '../../utils/jwt';
import Password from '../../utils/password';

export default class AuthController {
  private authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }
  async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { name, email, password } = req.body;

      const foundUser = await this.authService.find(email);

      if (foundUser) {
        throw new Error(`email ${foundUser.Email} is already use`);
      }

      const user: Omit<IUser, 'Id'> = {
        Name: name,
        Email: email,
        Password: await Password.createHash(password),
        Rol: 'user_rol',
        CreatedAt: new Date(),
      };

      const response = await this.authService.create(user);
      const token = await Jwt.signToken(response.Identity);

      res.status(201).send({ token: token });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      const foundUser = await this.authService.find(email);

      if (!foundUser) {
        throw new Error(`invalid email or password `);
      }

      const matchPassword = await Password.comparePassword(
        password,
        foundUser.Password,
      );

      if (!matchPassword) {
        throw new Error(`invalid email or password `);
      }

      const token = await Jwt.signToken(foundUser.Id);
      res.status(200).send({ token: token });
    } catch (error) {
      next(error);
    }
  }

  async perfil(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const id = req.authUser?.Id as number;

      const userFound = await this.authService.getById(id);

      if (!userFound) {
        throw new Error('user not found');
      }
      const user = new UserDto(
        userFound.Id,
        userFound.Name,
        userFound.Email,
        userFound.Rol,
        userFound.CreatedAt,
      );
      res.send({ user: user });
    } catch (error) {
      next(error);
    }
  }
}
