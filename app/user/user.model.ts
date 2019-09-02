import { Document, model, Schema } from 'mongoose';
import { User } from '../user';

export const CredentialsSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export const UserSchema = new Schema(
  {
    name: String,
    credentials: CredentialsSchema
  },
  { timestamps: true }
);

export const UserModel = model<User & Document>('User', UserSchema);
