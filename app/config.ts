export interface Config {
  APP_PORT: number;
  DB_CONNECTION: string;
  DB_NAME: string;
  LOGGING: string;
  SECRET_KEY: string;
  TOKEN_EXPIRY: number;
}

export const Environment = {
  DEV: {
    APP_PORT: 8080,
    DB_CONNECTION: 'mongodb://localhost:27017',
    DB_NAME: 'ts-express',
    LOGGING: 'dev',
    SECRET_KEY: 'secret',
    TOKEN_EXPIRY: 3600
  } as Config,
  TEST: {
    APP_PORT: 8080,
    DB_CONNECTION: 'mongodb://localhost:27017',
    DB_NAME: 'tsexp-test',
    LOGGING: 'dev',
    SECRET_KEY: 'secret',
    TOKEN_EXPIRY: 3600
  } as Config
};
