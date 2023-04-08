import {Router} from 'express'
import UserController from '../controller/UserController.js'
import { validadeFiels } from '../middleware/registerMiddleware.js'

const router = Router()

router
    .post('/register',validadeFiels, UserController.insertUser)
    .post('/auth', UserController.loginUser)

export default router    