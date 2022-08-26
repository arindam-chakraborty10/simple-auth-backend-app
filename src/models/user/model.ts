import { Document } from 'mongoose';

interface IUSerName extends Document {
  first: string;
  last: string;
}

export interface IUser extends Document {
  name: IUSerName;
  email: string;
  password: string;
}

export interface ILoginUserRequest {
  email: string;
  password: string;
}

export interface IUserRequestObject {
  _id: string;
  name: IUSerName;
  email: string;
}

export interface ICreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
