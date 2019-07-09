import { User } from '@app/user';
import { Document, model, Schema } from 'mongoose';

export const CredentialsSchema = new Schema({
  email: String,
  password: String
});

export const UserSchema = new Schema(
  {
    name: String,
    credentials: CredentialsSchema
  },
  { timestamps: true }
);

export const UserModel = model<User & Document>('User', UserSchema);
