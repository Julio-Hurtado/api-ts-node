import { enviroment } from './enviroment';
import { config } from 'mssql';

export const sqlConfig: config = {
  user: enviroment.userDb,
  password: enviroment.userPassword,
  server: enviroment.serverDb,
  database: enviroment.database,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true,
    trustServerCertificate: true,
    enableArithAbort: true,
    //instancename:'<nombre instancia>' en caso se tenga alguna instancia
  },
};
