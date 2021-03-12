import multer from 'multer';
import { Router } from 'express';

import uploadConfig from '@config/upload';
import ensureAuthenticated from '@middlewares/ensureAuthenticated';

import UsersController from '@controllersUsers/UsersController';
import UserAvatarController from '@controllersUsers/UserAvatarController';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
