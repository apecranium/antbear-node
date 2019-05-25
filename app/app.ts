import express from 'express';

export default class App {
  public app: express.Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.app.use(express.json());

    this.app.get('/', (req, res) => {
      res.json('hello world');
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`app listening at http://localhost:${this.port}`);
    });
  }
}
