import express, { Application } from 'express';
import path from 'path';
import Routes from './routes';

export default class ServerExpress {
  private static Instance: ServerExpress | null = null;
  private readonly _app: Application;
  private readonly _routesV1: Routes;
  private port: number;

  private constructor(port: number) {
    this._app = express();
    this.port = port;
    this._routesV1 = new Routes();
    this.middleware();
    this.routes();
  }

  static create(port: number): ServerExpress {
    if (!ServerExpress.Instance) {
      ServerExpress.Instance = new ServerExpress(port);
    }
    return ServerExpress.Instance;
  }

  private get publicPath(): string {
    return path.resolve(__dirname, '../public');
  }

  private middleware(): void {
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: false }));
    this._app.disable('x-powered-by');
    // this._app.use(express.static(this.publicPath));
  }

  private routes(): void {
    this._app.use('/apiV1', this._routesV1.router);
  }

  start(callback: VoidFunction): void {
    this._app.listen(this.port, callback);
  }
}
