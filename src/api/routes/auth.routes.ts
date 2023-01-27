import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { isAuthenticated } from '../middlewares/authenticated';

export class AuthRoutes {
  private router: Router;
  private controller: AuthController;
  constructor() {
    this.router = Router();
    this.controller = new AuthController();
  }

  public get routes() {
    this.router
      .get('/perfil', isAuthenticated, (req, res, next) =>
        this.controller.perfil(req, res, next),
      )
      .post('/register', (req, res, next) =>
        this.controller.register(req, res, next),
      )
      .post('/login', (req, res, next) =>
        this.controller.login(req, res, next),
      );
    return this.router;
  }
}
