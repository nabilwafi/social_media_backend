import { Router } from 'express'
import {
  createComment,
  deleteComment,
  getAllCommentsByPostId,
  getCommentById,
  updateComment
} from '../controllers/comment.controller'
import { requireUser } from '../middlewares/auth'

const router = Router()

router.get('/', getAllCommentsByPostId)
router.get('/:uuid', getCommentById)
router.post('/', requireUser, createComment)
router.put('/:uuid', requireUser, updateComment)
router.delete('/:uuid', requireUser, deleteComment)

export default router
