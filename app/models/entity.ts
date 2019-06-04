import { Document, model, Schema } from 'mongoose';
import IEntity from '../interfaces/ientity';

const EntitySchema: Schema = new Schema(
  { name: String },
  { timestamps: true }
);

const EntityModel = model<IEntity & Document>('Entity', EntitySchema);

export default EntityModel;
