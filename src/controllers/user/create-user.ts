import { Request, Response } from 'express';
import { StatusError } from '../../config/statusError/statusError';
import { ICreateUserRequest, ILoginUserRequest } from '../../models/user/model';
import { userService } from '../../services';
import { hash } from 'bcrypt';
import { envs } from '../../config/env';

export const createUser = async (
  req: Request,
  res: Response,
  next: NewableFunction
) => {
  try {
    console.log(req.body);

    const reqBody: ICreateUserRequest = req.body;
    const isUnique = await userService.checkUniqueEmail(reqBody.email);

    if (!isUnique) {
      res.status(400).send('unique mail');
    }
    reqBody.password = await hash(reqBody.password, Number(envs.passwordSalt));
    await userService.saveUser(reqBody);
    res.sendStatus(204);

    next();
  } catch (error) {
    next(error);
  }
};
