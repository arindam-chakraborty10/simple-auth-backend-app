import bodyParser from 'body-parser';
import express, { Application } from 'express';
import { connect as mongoConnect } from './config/database/mongo';
import bearerToken from 'express-bearer-token';
import cors from 'cors';
import { handleError } from './config/handleErrors/handleError';
import { v1Router } from './routes';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.headers();
    this, this.initializeMiddleware();
    this.initializeDBConnection();
    this.initializeRoute();
    this.overrideResponse();
  }

  private initializeDBConnection() {
    mongoConnect();
  }

  private initializeMiddleware() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bearerToken());
  }

  private headers() {
    this.app.use(cors());
  }

  private overrideResponse() {
    this.app.use(handleError);
  }

  private initializeRoute() {
    this.app.use('/v1', v1Router);
  }
}

export default new App().app;
