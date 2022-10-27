import dotenv from 'dotenv';
dotenv.config();
export const enviroment = {
  port: Number(process.env.PORT),
  userDb: process.env.USER as string,
  userPassword: process.env.PASSWORD as string,
  serverDb: process.env.SERVER_DB as string,
  database: process.env.DATABASE_NAME as string,
};
