import { ErrorHandler } from '@app/errorhandler';
import { Controller } from '@app/shared/controller';
import express from 'express';
import morgan from 'morgan';

export class App {
  public app: express.Application;
  public port: number;
  public path = '/api';

  constructor(port: number, controllers: Controller[]) {
    this.app = express();
    this.port = port;
    this.app.use(express.json());
    this.app.use(morgan('dev'));

    controllers.forEach(controller => {
      this.app.use(this.path, controller.router);
    });

    this.app.use(ErrorHandler);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`app listening at http://localhost:${this.port}`);
    });
  }
}
