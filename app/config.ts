import fs from 'fs';
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

export class Config {
  private static cfg: Configuration;
  private static path = './prod.config.toml';

  private constructor() {}

  public static get env() {
    if (!Config.cfg) {
      Config.cfg = toml.parse(fs.readFileSync(Config.path, { encoding: 'utf8' }));
    }
    return Config.cfg;
  }
}
