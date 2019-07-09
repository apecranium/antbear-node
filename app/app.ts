import { Config } from '@app/config';
import { Controller } from '@app/shared/controller';
import { ErrorHandler } from '@app/shared/errorhandler';
import express from 'express';
import morgan from 'morgan';

export class App {
  public app = express();
  public port: number;
  public path = '/api';

  constructor(env: Config, controllers: Controller[]) {
    this.port = env.APP_PORT;
    this.app.use(express.json());
    this.app.use(morgan(env.LOGGING));

    for (const controller of controllers) {
      this.app.use(this.path, controller.router);
    }

    this.app.use(new ErrorHandler().handle);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`app listening at http://localhost:${this.port}`);
    });
  }
}
