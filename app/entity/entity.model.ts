import { Entity } from '@app/entity';
import { Document, model, Schema } from 'mongoose';

export const EntitySchema = new Schema(
  { name: String },
  { timestamps: true }
);

export const EntityModel = model<Entity & Document>('Entity', EntitySchema);
