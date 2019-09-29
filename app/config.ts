import { config } from 'dotenv';

config();

export class Config {
  public static readonly env = process.env.NODE_ENV || 'development';
  public static readonly webPort = Number(process.env.WEB_PORT) || 8080;
  public static readonly apiPort = Number(process.env.API_PORT) || 8081;
  public static readonly dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ts-express';
  public static readonly testDb = process.env.TESTDB_URI || 'mongodb://localhost:27017/test';
  public static readonly secretKey = process.env.SECRET_KEY || 'secret';
  public static readonly logLevel = process.env.LOG || 'dev';
  public static readonly tokenExpiry = process.env.TOKEN_EXPIRY || '1h';
}
