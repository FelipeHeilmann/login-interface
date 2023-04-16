import {Router} from 'express'
import UserController from '../controller/UserController.js'
import { validadeFiels } from '../middleware/registerMiddleware.js'
import { validateToken } from '../middleware/authMiddleware.js'

const router = Router()

router
    .post('/register',validadeFiels, UserController.insertUser)
    .post('/auth', UserController.loginUser)
    .post('/forgot_password', UserController.forgotPass)
    .post('/reset_password', UserController.resetPass)
    .get('/users', validateToken, UserController.getUsers)

export default router    