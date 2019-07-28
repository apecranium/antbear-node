import mongoose from 'mongoose';

export class Database {
  public async connect() {
    try {
      const connectionString = process.env.MONGODB_URI as string;
      await mongoose.connect(connectionString, { useNewUrlParser: true, family: 4 });
      console.log('connected to database');
    } catch (err) {
      console.log(`error connecting to database: ${err}`);
    }
  }

  public async disconnect() {
    try {
      await mongoose.connection.close();
    } catch (err) {
      console.log(`error disconnecting from database: ${err}`);
    }
  }

  public async dropDatabase() {
    try {
      await mongoose.connection.dropDatabase();
    } catch (err) {
      console.log(`error dropping database: ${err}`);
    }
  }
}
