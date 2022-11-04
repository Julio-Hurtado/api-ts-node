import { ConnectionPool, TYPES } from 'mssql';
import { sqlConfig } from '../config/dbconfig';
export default class SqlServer {
  public pool: ConnectionPool;

  constructor() {
    this.pool = new ConnectionPool(sqlConfig);
  }
  async connect(): Promise<ConnectionPool> {
    return this.pool.connect();
  }
  async close(): Promise<void> {
    return this.pool.close();
  }
  public get types() {
    return TYPES;
  }
}
