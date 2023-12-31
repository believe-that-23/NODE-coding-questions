import express from 'express';
import UserController from './user.controller.js';
import jwtAuth from '../../middleware/jwt.middleware.js';

const router = express.Router();

const userController = new UserController();


router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
router.get('/logout', jwtAuth, userController.logout);
router.get('/logout-all-devices', jwtAuth, userController.logoutAllDevices);

router.get('/get-details/:userId', jwtAuth, userController.getUserDetails);
router.get('/get-all-details', jwtAuth, userController.getAllUserDetails);

export default router;