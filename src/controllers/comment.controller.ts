import { Request, Response, RequestHandler } from 'express'
import logger from '../utils/logger'
import { CommentValidation } from '../validations/comment.validation'
import Comment from '../db/models/comment.model'
import User from '../db/models/user.model'

export const getAllCommentsByPostId = (async (req: Request, res: Response) => {
  const { postId } = req.params

  try {
    const comments = await Comment.findAll({
      where: {
        postId
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password', 'refreshToken']
          }
        },
        'post'
      ]
    })

    return res.status(200).json({
      status: 'success',
      data: comments
    })
  } catch (error: any) {
    logger.error(`ERR: comments - get = ${error}`)
    return res.status(500).json({
      status: 'failed',
      message: error
    })
  }
}) as RequestHandler

export const getCommentById = (async (req: Request, res: Response) => {
  const { postId, uuid } = req.params

  try {
    const comment = await Comment.findOne({
      where: {
        uuid,
        postId
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password', 'refreshToken']
          }
        },
        'post'
      ]
    })

    return res.status(200).json({
      status: 'success',
      data: comment
    })
  } catch (error: any) {
    logger.error(`ERR: comment - get = ${error}`)
    return res.status(500).json({
      status: 'failed',
      message: error
    })
  }
}) as RequestHandler

export const createComment = (async (req: Request, res: Response) => {
  const { postId } = req.params

  const { error, value } = CommentValidation(req.body)
  if (error) {
    logger.error(`ERR: comment - validation: ${error.details}`)
    return res.status(400).json({
      status: 'failed',
      message: error.details
    })
  }

  value.postId = postId

  try {
    await Comment.create(value)

    return res.status(200).json({
      status: 'success',
      message: 'Successfully Created Comment'
    })
  } catch (error: any) {
    logger.error(`ERR: comment - get = ${error}`)
    return res.status(500).json({
      status: 'failed',
      message: error
    })
  }
}) as RequestHandler

export const updateComment = (async (req: Request, res: Response) => {
  const { postId, uuid } = req.params
  const { error, value } = CommentValidation(req.body)
  if (error) {
    logger.error(`ERR: comment - validation: ${error.details}`)
    return res.status(400).json({
      status: 'failed',
      message: error.details
    })
  }

  value.postId = postId

  try {
    const comment = await Comment.findOne({
      where: {
        uuid
      }
    })
    if (!comment) {
      logger.error('ERR: comment - update: not found')
      return res.status(404).json({
        status: 'failed',
        message: 'comment not found'
      })
    }

    await comment.update(value)

    return res.status(200).json({
      status: 'success',
      message: 'Successfully Updated Comment'
    })
  } catch (error: any) {
    logger.error(`ERR: comment - get = ${error}`)
    return res.status(500).json({
      status: 'failed',
      message: error
    })
  }
}) as RequestHandler

export const deleteComment = (async (req: Request, res: Response) => {
  const { uuid } = req.params

  try {
    const comment = await Comment.findOne({
      where: {
        uuid
      }
    })
    if (!comment) {
      logger.error('ERR: comment - delete: not found')
      return res.status(404).json({
        status: 'failed',
        mesage: 'comment not found'
      })
    }

    await comment.destroy()

    return res.status(200).json({
      status: 'success',
      mesage: 'Successfully Deleted Comment'
    })
  } catch (error) {
    logger.error(`ERR: comment - delete: ${error}`)
    return res.status(500).json({
      status: 'failed',
      mesage: error
    })
  }
}) as RequestHandler
