import { Router } from 'express'
import { signIn, signUp } from '../controller/userController.js'

const userRouter = Router()

userRouter.post('/sign-up', signUp)
userRouter.post('/sign-in', signIn)

export default userRouter
