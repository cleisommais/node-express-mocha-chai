import express from 'express';
import UserController from '../controllers/user';
import AsyncHandler from '../middlewares/async-handler';
const router = express.Router({ mergeParams: true });
const userController = new UserController();

router
    .route('/')
    .get(new AsyncHandler().request(userController.getUsers))
    .post(new AsyncHandler().request(userController.createUser));

router
    .route('/:id')
    .get(new AsyncHandler().request(userController.getUserById))
    .put(new AsyncHandler().request(userController.updateUserById))
    .delete(new AsyncHandler().request(userController.deleteUserById));
export default router;
