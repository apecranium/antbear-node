import fs from 'fs';
import path from 'path';
import toml from 'toml';

export interface Configuration {
  port: number;
  log: string;
  secret: string;
  tokenExpiry: string;

  db: {
    connection: string;
    name: string;
  };
}

/* export interface Configuration {
  APP_PORT: number;
  DB_CONNECTION: string;
  DB_NAME: string;
  LOGGING: string;
  SECRET_KEY: string;
  TOKEN_EXPIRY: string;
}

export const Environment = {
  DEV: {
    APP_PORT: 8080,
    DB_CONNECTION: 'mongodb://localhost:27017',
    DB_NAME: 'ts-express',
    LOGGING: 'dev',
    SECRET_KEY: 'secret',
    TOKEN_EXPIRY: '1h'
  } as Configuration,
  TEST: {
    APP_PORT: 8080,
    DB_CONNECTION: 'mongodb://localhost:27017',
    DB_NAME: 'tsexp-test',
    LOGGING: 'dev',
    SECRET_KEY: 'secret',
    TOKEN_EXPIRY: '1h'
  } as Configuration
}; */

export class Config {
  private static cfg: Configuration;
  private static path = path.resolve('app/config.toml');

  private constructor() {}

  public static get env() {
    if (!Config.cfg) {
      Config.cfg = toml.parse(fs.readFileSync(Config.path, { encoding: 'utf8' }));
    }
    return Config.cfg;
  }
}
