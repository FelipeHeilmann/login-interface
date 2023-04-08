import {Router} from 'express'
import UserController from '../controller/UserController.js'

const router = Router()

router
    .post('/register', UserController.insertUser)

export default router    