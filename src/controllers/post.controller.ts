import { Request, Response, RequestHandler } from 'express'
import logger from '../utils/logger'
import Post from '../db/models/post.model'
import { PostValidation } from '../validations/post.validation'

export const getAllPost = (async (req: Request, res: Response) => {
  try {
    const posts = await Post.findAll({
      include: ['user', 'comments']
    })

    return res.status(200).json({
      status: 'success',
      data: posts
    })
  } catch (error: any) {
    logger.error(`ERR: post - get = ${error}`)
    return res.status(500).json({
      status: 'failed',
      message: error
    })
  }
}) as RequestHandler

export const getPostById = (async (req: Request, res: Response) => {
  const { uuid } = req.params

  try {
    const post = await Post.findOne({
      where: {
        uuid
      },
      include: ['user', 'comments']
    })

    return res.status(200).json({
      status: 'success',
      data: post
    })
  } catch (error: any) {
    logger.error(`ERR: post - get = ${error}`)
    return res.status(500).json({
      status: 'failed',
      message: error
    })
  }
}) as RequestHandler

export const createPost = (async (req: Request, res: Response) => {
  const { error, value } = PostValidation(req.body)
  if (error) {
    logger.error(`ERR: post - validation: ${error.details}`)
    return res.status(400).json({
      status: 'failed',
      message: error.details
    })
  }

  try {
    await Post.create(value)

    return res.status(200).json({
      status: 'success',
      message: 'Successfully Created Post'
    })
  } catch (error: any) {
    logger.error(`ERR: post - get = ${error}`)
    return res.status(500).json({
      status: 'failed',
      message: error
    })
  }
}) as RequestHandler

export const updatePost = (async (req: Request, res: Response) => {
  const { uuid } = req.params
  const { error, value } = PostValidation(req.body)
  if (error) {
    logger.error(`ERR: post - validation: ${error.details}`)
    return res.status(400).json({
      status: 'failed',
      message: error.details
    })
  }

  try {
    const post = await Post.findOne({
      where: {
        uuid
      }
    })
    if (!post) {
      logger.error('ERR: post - update: not found')
      return res.status(404).json({
        status: 'failed',
        message: 'post not found'
      })
    }

    await post.update(value)

    return res.status(200).json({
      status: 'success',
      message: 'Successfully Updated Post'
    })
  } catch (error: any) {
    logger.error(`ERR: post - get = ${error}`)
    return res.status(500).json({
      status: 'failed',
      message: error
    })
  }
}) as RequestHandler

export const deletePost = (async (req: Request, res: Response) => {
  const { uuid } = req.params

  try {
    const post = await Post.findOne({
      where: {
        uuid
      }
    })
    if (!post) {
      logger.error('ERR: post - delete: not found')
      return res.status(404).json({
        status: 'failed',
        mesage: 'post not found'
      })
    }

    await post.destroy()

    return res.status(200).json({
      status: 'success',
      mesage: 'Successfully Deleted Post'
    })
  } catch (error) {
    logger.error(`ERR: post - delete: ${error}`)
    return res.status(500).json({
      status: 'failed',
      mesage: error
    })
  }
}) as RequestHandler
