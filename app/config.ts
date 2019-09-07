import { config } from 'dotenv';

config();

export class Config {
  public static readonly webPort = parseInt(process.env.WEB_PORT as string, 10) || 8080;
  public static readonly apiPort = parseInt(process.env.API_PORT as string, 10) || 8081;
  public static readonly dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ts-express';
  public static readonly testDb = process.env.TESTDB_URI || 'mongodb://localhost:27017/test';
  public static readonly secretKey = process.env.SECRET_KEY || 'secret';
  public static readonly logLevel = process.env.LOG || 'dev';
  public static readonly tokenExpiry = process.env.TOKEN_EXPIRY || '1h';
}
