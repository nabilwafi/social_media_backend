import { Router } from 'express'
import {
  createComment,
  deleteComment,
  getAllCommentsByPostId,
  getCommentById,
  updateComment
} from '../controllers/comment.controller'

const router = Router()

router.get('/', getAllCommentsByPostId)
router.get('/:uuid', getCommentById)
router.post('/', createComment)
router.put('/:uuid', updateComment)
router.delete('/:uuid', deleteComment)

export default router
