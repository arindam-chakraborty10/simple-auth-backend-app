import userModel from '../../models/user/schema';
import jwt from 'jsonwebtoken';
import {
  ICreateUserRequest,
  IUser,
  IUserRequestObject,
} from '../../models/user/model';
import { envs } from '../../config/env';
import { Types } from 'mongoose';
import { resolve } from 'path';

export const checkUniqueEmail = async (email: string) => {
  const condition = {
    email: {
      $regex: new RegExp(email),
    },
  };

  const emailCount = await userModel.countDocuments(condition);

  return emailCount > 0 ? false : true;
};

export const generateUserTokens = (userDetals: IUser | IUserRequestObject) => {
  const accessTokenExpiry = envs.jwt.accessToken.expiry;
  const refreshTokenExpiry = envs.jwt.refreshToken.expiry;

  const accessToken = jwt.sign(
    { _id: userDetals._id, name: userDetals.name, email: userDetals.email },
    envs.jwt.accessToken.secret,
    { expiresIn: accessTokenExpiry }
  );

  const refreshToken = jwt.sign(
    { _id: userDetals._id, name: userDetals.name, email: userDetals.email },
    envs.jwt.refreshToken.secret,
    { expiresIn: refreshTokenExpiry }
  );

  return {
    accessToken: accessToken,
    accessTokenExpiry: accessTokenExpiry,
    refreshToken: refreshToken,
    refreshTokenExpiry: refreshTokenExpiry,
    name: userDetals.name,
    email: userDetals.email,
  };
};

export const getUserDetailsByEmail = async (email: string) => {
  const condition = {
    email: {
      $regex: new RegExp(email),
    },
  };

  const selection = { __v: 0 };

  const user = await userModel.findOne(condition, selection);

  return user;
};

export const getUserDetailsById = async (id: string) => {
  const condition = {
    _id: new Types.ObjectId(id),
  };

  const selection = { _id: 1, name: 1, email: 1 };

  const user = await userModel.findOne(condition, selection);

  return user;
};

export const saveUser = async (userDetails: ICreateUserRequest) => {
  const newUser: IUser = new userModel({
    name: {
      first: userDetails.firstName,
      last: userDetails.lastName,
    },
    email: userDetails.email,
    password: userDetails.password,
  });

  await newUser.save();

  return newUser;
};

export const verifyUserToken = (token: string, tokenSecret: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, tokenSecret, (err, decodeData) => {
      if (err) {
        reject(err);
      } else {
        resolve(decodeData);
      }
    });
  });
};
