import { Router } from 'express'
import {
  createPost,
  deletePost,
  getAllPost,
  getPostById,
  updatePost
} from '../controllers/post.controller'

const router = Router()

router.get('/', getAllPost)
router.get('/:uuid', getPostById)
router.post('/', createPost)
router.put('/:uuid', updatePost)
router.delete('/:uuid', deletePost)

export default router
