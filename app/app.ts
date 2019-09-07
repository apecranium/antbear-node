import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { Config } from './config';
import { Controller, ErrorHandler } from './shared';

export class App {
  public app = express();
  public view = 'index';

  constructor(public port: number, public path: string, isWeb: boolean, controllers: Controller[]) {
    this.app.use(express.json());
    this.app.use(morgan(Config.logLevel));
    this.app.use(helmet());

    if (isWeb) {
      this.app.use('/static', express.static('static'));
      this.app.set('view engine', 'pug');
    }

    for (const controller of controllers) {
      this.app.use(this.path, controller.router);
    }

    this.app.all('*', (req, res) => {
      res.render('404', { title: 'error' });
    });

    this.app.use(new ErrorHandler(isWeb).handle);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`app listening at port ${this.port}`);
    });
  }
}
