import { User } from '@app/user';
import { Document, model, Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    email: String,
    name: String,
    password: String
  },
  { timestamps: true }
);

export const UserModel = model<User & Document>('User', UserSchema);
