import express, {Request, Response, NextFunction} from 'express';
const router = express.Router();
import {Login, Logout, Register} from '../movieController/userController'

/* GET users listing. */
router.post('/register', Register);
router.post('/login', Login);
router.get('/logout', Logout);

export default router;
