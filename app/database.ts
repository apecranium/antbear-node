import Config from '@app/config';
import mongoose from 'mongoose';

export class Database {
  public async connect() {
    try {
      await mongoose.connect(`${Config.DB_CONNECTION}/${Config.DB_NAME}`, { useNewUrlParser: true, family: 4 });
      console.log('connected to database');
    } catch (err) {
      console.log(`error connecting to database: ${err}`);
    }
  }
}
