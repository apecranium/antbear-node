import { Document, model, Schema } from 'mongoose';
import { Entity } from '../entity';

export const EntitySchema = new Schema(
  { name: String },
  { timestamps: true }
);

export const EntityModel = model<Entity & Document>('Entity', EntitySchema);
