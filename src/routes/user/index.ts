import { userController } from '../../controllers';
import { Router } from 'express';

const userRouter = Router();

userRouter.post('/signup', userController.createUser);

userRouter.post('/login', userController.userLogin);

export { userRouter };
