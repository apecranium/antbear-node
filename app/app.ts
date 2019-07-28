import { Config } from '@app/config';
import { Controller, ErrorHandler } from '@app/shared';
import express from 'express';
import morgan from 'morgan';

export class App {
  public app = express();
  public port: number;
  public path = '/api';

  constructor(controllers: Controller[]) {
    this.port = parseInt(process.env.PORT as string, 10) || Config.env.port;
    this.app.use(express.json());
    this.app.use(morgan(Config.env.log));

    this.app.get('/', (req, res) => {
      res.json({ message: 'Hello, welcome to my API!' });
    });

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
