import { Request, Response } from 'express';

export const handleError = (err: any, req: Request, res: Response) => {
  let message: string;
  let status: number;

  if (err.statusCode) {
    message = err.message || 'server error';
    status = err.statusCode;
  } else {
    message = 'server error';
    status = 500;
  }

  res.locals.error = message;

  res.status(status).send({ error: message });
};
