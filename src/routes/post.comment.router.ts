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

router.get('/:postId/comments', getAllCommentsByPostId)
router.get('/:postId/comments/:uuid', getCommentById)
router.post('/:postId/comments', requireUser, createComment)
router.put('/:postId/comments/:uuid', requireUser, updateComment)
router.delete('/:postId/comments/:uuid', requireUser, deleteComment)

export default router
