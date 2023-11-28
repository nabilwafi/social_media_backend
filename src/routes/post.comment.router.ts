import { Router } from 'express'
import {
  createComment,
  deleteComment,
  getAllCommentsByPostId,
  getCommentById,
  updateComment
} from '../controllers/comment.controller'

const router = Router()

router.get('/:postId/comments', getAllCommentsByPostId)
router.get('/:postId/comments/:uuid', getCommentById)
router.post('/:postId/comments', createComment)
router.put('/:postId/comments/:uuid', updateComment)
router.delete('/:postId/comments/:uuid', deleteComment)

export default router
