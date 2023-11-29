import { Router } from 'express'
import {
  loginUser,
  registerUser,
  logoutUser,
  refreshToken,
  getMe,
  editProfile,
  changePassword
} from '../controllers/auth.controller'
import upload from '../utils/multer'
import { requireUser } from '../middlewares/auth'

const router = Router()

router.post('/login', loginUser)
router.get('/profile', requireUser, getMe)
router.put('/profile', requireUser, upload.single('photo_profile'), editProfile)
router.patch('/change-password', requireUser, changePassword)
router.post('/register', upload.single('photo_profile'), registerUser)
router.delete('/logout', logoutUser)
router.post('/token', refreshToken)

export default router
