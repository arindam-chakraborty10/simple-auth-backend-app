import mongoose from 'mongoose';
import { envs } from '../env';

export const connect = () => {
  const connectionString = `mongodb://${envs.db.host}:${envs.db.port}/${envs.db.database}`;

  mongoose.connect(connectionString, {}, (err) => {
    if (err) {
      console.log('mongodb connection error: ', err);
    } else {
      console.log('mongodb connected');
    }
  });
};
