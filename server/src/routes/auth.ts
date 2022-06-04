import { login, register } from '../controllers/auth'
import express from 'express'
const authRouter = express.Router()

authRouter.route('/register').post(register)
authRouter.route('/login').post(login)

export default authRouter
