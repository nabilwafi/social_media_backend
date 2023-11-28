import { Router } from 'express'
import {
  createPost,
  deletePost,
  getAllPost,
  getPostById,
  updatePost
} from '../controllers/post.controller'
import { requireUser } from '../middlewares/auth'

const router = Router()

router.get('/', getAllPost)
router.get('/:uuid', getPostById)
router.post('/', requireUser, createPost)
router.put('/:uuid', requireUser, updatePost)
router.delete('/:uuid', requireUser, deletePost)

export default router
