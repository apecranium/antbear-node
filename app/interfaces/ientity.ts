import { Document } from 'mongoose';

export default interface IEntity extends Document {
  name: string;
}
