import { Request, Response, RequestHandler } from 'express'
import logger from '../utils/logger'
import { RegisterUserValidation } from '../validations/register.validation'
import { comparedPassword, hashedPassword } from '../utils/bcrypt'
import User, { UserAttributes } from '../db/models/user.model'
import { LoginUserValidation } from '../validations/login.validation'
import { signJWT } from '../utils/jwt'

export const registerUser = (async (req: Request, res: Response) => {
  const { error, value } = RegisterUserValidation(req.body)
  if (error) {
    logger.error(`ERR: register - route = ${error.details}`)
    return res.status(403).json({
      status: 'failed',
      message: error.details
    })
  }

  try {
    const passwordHashed = await hashedPassword(value.password)

    value.password = passwordHashed

    await User.create(value)

    return res.status(201).json({
      status: 'success',
      message: 'Successfully Registered Account'
    })
  } catch (error: any) {
    logger.error(`ERR: register - route = ${error}`)
    return res.status(500).json({
      status: 'failed',
      message: 'Internal Server Error'
    })
  }
}) as RequestHandler

export const loginUser = (async (req: Request, res: Response) => {
  const { error, value } = LoginUserValidation(req.body)
  if (error) {
    logger.error(`ERR: login - route = ${error.details}`)
    return res.status(400).json({
      status: 'failed',
      message: error.details
    })
  }

  try {
    const user = await User.findOne({
      where: {
        email: value.email
      }
    })
    if (!user) {
      return res.status(404).json({
        status: 'failed',
        message: 'user not found'
      })
    }

    const matchPassword = comparedPassword(value.password, user?.password!)
    if (!matchPassword) {
      return res.status(400).json({
        status: 'failed',
        message: 'wrong password'
      })
    }

    const accessToken = signJWT(
      {
        uuid: user.uuid,
        username: user.username,
        email: user.email,
        name: user.name,
        bio: user.name,
        photo_profile: user.photo_profile
      },
      { expiresIn: '1y' }
    )

    const data: UserAttributes = {
      uuid: user.uuid,
      username: user.username,
      email: user.email,
      name: user.name,
      bio: user.name,
      photo_profile: user.photo_profile
    }

    return res.status(200).json({
      status: 'success',
      data: {
        accessToken,
        user: data
      }
    })
  } catch (error) {
    logger.error(`ERR: login - route = ${error}`)
    return res.status(500).json({ status: 'failed', message: error })
  }
}) as RequestHandler
