import { Config } from '@app/config';
import { ErrorHandler } from '@app/errorhandler';
import { Controller } from '@app/shared/controller';
import express from 'express';
import morgan from 'morgan';

export class App {
  public app: express.Application;
  public port: number;
  public path = '/api';

  constructor(env: Config, controllers: Controller[]) {
    this.app = express();
    this.port = env.APP_PORT;
    this.app.use(express.json());
    this.app.use(morgan(env.LOGGING));

    for (const controller of controllers) {
      this.app.use(this.path, controller.router);
    }

    this.app.use(new ErrorHandler().Handle);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`app listening at http://localhost:${this.port}`);
    });
  }
}
