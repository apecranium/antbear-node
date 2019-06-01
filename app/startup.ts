import mongoose from 'mongoose';
import App from './app';
import Config from './config';
import EntityController from './controllers/entitycontroller';

mongoose.connect(`${Config.DB_CONNECTION}/${Config.DB_NAME}`, { useNewUrlParser: true }).then(
  () => { console.log('connected to database'); },
  err => { console.log(`error connecting to database: ${err}`); }
);

const app = new App(
  Config.APP_PORT,
  [
    new EntityController()
  ]
);

app.listen();
