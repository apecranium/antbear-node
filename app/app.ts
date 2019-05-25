import express from 'express';
import IController from './interfaces/icontroller';

export default class App {
  public app: express.Application;
  public port: number;

  constructor(port: number, controllers: IController[]) {
    this.app = express();
    this.port = port;
    this.app.use(express.json());

    controllers.forEach(controller => {
      this.app.use('/', controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`app listening at http://localhost:${this.port}`);
    });
  }
}
