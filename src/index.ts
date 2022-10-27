import ServerExpress from './api/server';
import { enviroment } from './config/enviroment';

const app = ServerExpress.create(enviroment.port);
app.start(() =>
  console.log(`app runing in http://localhost:${enviroment.port}`),
);
