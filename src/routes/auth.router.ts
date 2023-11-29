import { Router } from 'express'
import {
  loginUser,
  registerUser,
  logoutUser,
  refreshToken
} from '../controllers/auth.controller'

const router = Router()

router.post('/login', loginUser)
router.post('/register', registerUser)
router.delete('/logout', logoutUser)
router.post('/token', refreshToken)

export default router
