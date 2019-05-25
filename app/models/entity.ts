import { Model, model, Schema } from 'mongoose';
import IEntity from '../interfaces/ientity';

const EntitySchema: Schema = new Schema(
  { name: String },
  { timestamps: true }
);

const Entity: Model<IEntity> = model<IEntity>('Entity', EntitySchema);

export default Entity;
