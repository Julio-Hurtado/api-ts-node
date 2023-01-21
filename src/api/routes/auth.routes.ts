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
      .get('/perfil', isAuthenticated, this.controller.perfil)
      .post('/register', this.controller.register)
      .post('/login', this.controller.login);
    return this.router;
  }
}
