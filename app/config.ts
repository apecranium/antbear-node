export interface Config {
  APP_PORT: number;
  DB_CONNECTION: string;
  DB_NAME: string;
}

export const Environment = {
  DEV: {
    APP_PORT: 8080,
    DB_CONNECTION: 'mongodb://localhost:27017',
    DB_NAME: 'ts-express'
  },
  TEST: {
    APP_PORT: 8080,
    DB_CONNECTION: 'mongodb://localhost:27017',
    DB_NAME: 'tsexp-test'
  }
};
