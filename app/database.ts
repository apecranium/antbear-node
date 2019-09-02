import { connect, connection} from 'mongoose';

export class Database {
  public async connect() {
    try {
      const connectionString = process.env.MONGODB_URI as string;
      await connect(connectionString, { useNewUrlParser: true, family: 4 });
      console.log('connected to database');
    } catch (error) {
      console.log(`error connecting to database: ${error}`);
    }
  }

  public async disconnect() {
    try {
      await connection.close();
    } catch (error) {
      console.log(`error disconnecting from database: ${error}`);
    }
  }

  public async dropDatabase() {
    try {
      await connection.dropDatabase();
    } catch (error) {
      console.log(`error dropping database: ${error}`);
    }
  }
}
