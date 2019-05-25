import mongoose from 'mongoose';
import App from './app';
import EntityController from './controllers/entitycontroller';

mongoose.connect('mongodb://localhost:27017/ts-express', { useNewUrlParser: true }).then(
  () => { console.log('connected to database'); },
  err => { console.log(`error connecting to database: ${err}`); }
);

const app = new App(
  8080,
  [
    new EntityController()
  ]
);

app.listen();
