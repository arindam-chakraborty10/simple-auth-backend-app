import mongoose, { Schema } from 'mongoose';
import { IUser } from './model';

const userSchema: Schema = new Schema(
  {
    name: {
      first: { type: String, required: true },
      last: { type: String, required: true },
    },
    email: { type: String, required: true, undefined: true, trim: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('userModel', userSchema, 'users');
