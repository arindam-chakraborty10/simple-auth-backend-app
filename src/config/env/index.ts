import { config } from 'dotenv';
config();

export const envs = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || '4000',
  db: {
    host: process.env.MONGO_HOST || 'localhost',
    port: process.env.MONGO_PORT || 27017,
    database: process.env.MONGO_DATABASE || 'test',
  },
  passwordSalt: process.env.PASSWORD_SALT_ROUND || '10',
  jwt: {
    accessToken: {
      secret: process.env.ACCESS_TOKEN_SECRET || '1234',
      expiry: Number(process.env.ACCESS_TOKEN_EXPIRY) || 3600,
    },
    refreshToken: {
      secret: process.env.REFRESH_TOKEN_SECRET || '1234',
      expiry: Number(process.env.REFRESH_TOKEN_EXPIRY) || 259200,
    },
  },
};
