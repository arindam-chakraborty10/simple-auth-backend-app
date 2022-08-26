import { Request, Response } from 'express';
import { StatusError } from '../../config/statusError/statusError';
import { ILoginUserRequest } from '../../models/user/model';
import { userService } from '../../services';
import { compare } from 'bcrypt';

export const userLogin = async (
  req: Request,
  res: Response,
  next: NewableFunction
) => {
  try {
    const reqBody: ILoginUserRequest = req.body;
    const userDetails = await userService.getUserDetailsByEmail(reqBody.email);

    if (!userDetails) throw StatusError.badRequest('invalid email or password');

    const isSame = await compare(reqBody.password, userDetails.password);

    if (!isSame) throw StatusError.badRequest('invalid email or password');

    res.send(userService.generateUserTokens(userDetails));

    next();
  } catch (error) {
    next(error);
  }
};
