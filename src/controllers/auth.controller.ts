import { Request, Response, RequestHandler } from 'express'
import logger from '../utils/logger'
import { RegisterUserValidation } from '../validations/register.validation'
import { comparedPassword, hashedPassword } from '../utils/bcrypt'
import User, { UserAttributes } from '../db/models/user.model'
import { LoginUserValidation } from '../validations/login.validation'
import { signJWT, verifyJWT } from '../utils/jwt'
import { saveImage } from '../utils/imageSaver'
import { editProfileValidation } from '../validations/editProfile.validation'
import { unlinkImage } from '../utils/imageUnlink'
import { changePasswordValidation } from '../validations/changePassword.validation'

export const registerUser = (async (req: Request, res: Response) => {
  const { error, value } = RegisterUserValidation(req.body)
  if (error) {
    logger.error(`ERR: register - route = ${error.details}`)
    return res.status(403).json({
      status: 'failed',
      message: error.details
    })
  }

  if (!req.file) {
    logger.error('ERR: register - route = file not found')
    return res.status(403).json({
      status: 'failed',
      message: 'image is require'
    })
  }

  try {
    const filename = saveImage(req.file?.path!, req.file?.filename!)

    value.photo_profile = filename

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

    const matchPassword = await comparedPassword(value.password, user.password)
    if (!matchPassword) {
      return res.status(400).json({
        status: 'failed',
        message: 'wrong password'
      })
    }

    const data: UserAttributes = {
      id: user.id,
      uuid: user.uuid,
      username: user.username,
      email: user.email,
      name: user.name,
      bio: user.name,
      photo_profile: user.photo_profile
    }

    const accessToken = signJWT(data, { expiresIn: '1h' })

    const refreshToken = signJWT(data, { expiresIn: '5d' })

    await user.update({ refreshToken })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 5 * 1000
    })

    return res.status(200).json({
      status: 'success',
      data: {
        user: data,
        accessToken
      }
    })
  } catch (error) {
    logger.error(`ERR: login - route = ${error}`)
    return res.status(500).json({ status: 'failed', message: error })
  }
}) as RequestHandler

export const getMe = (async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      attributes: [
        'id',
        'uuid',
        'username',
        'name',
        'bio',
        'photo_profile',
        'email'
      ],
      include: ['posts'],
      where: {
        uuid: res.locals.user.uuid
      }
    })
    if (!user) {
      logger.error('ERR: getMe - route = not found')
      return res.status(404).json({
        status: 'failed',
        message: 'User Not Found'
      })
    }

    return res.status(200).json({
      status: 'success',
      data: user
    })
  } catch (error) {
    logger.error(`ERR: getMe - route = ${error}`)
    return res.status(500).json({
      status: 'success',
      message: error
    })
  }
}) as RequestHandler

export const editProfile = (async (req: Request, res: Response) => {
  const { error, value } = editProfileValidation(req.body)
  if (error) {
    logger.error(`ERR: edit profile - route = ${error.details}`)
    return res.status(403).json({
      status: 'failed',
      message: error.details
    })
  }

  try {
    const user = await User.findOne({
      where: {
        uuid: res.locals.user.uuid
      }
    })
    if (!user) {
      logger.error('ERR: edit Profile - route = not found')
      return res.status(404).json({
        status: 'failed',
        message: 'user not found'
      })
    }

    if (req.file) {
      unlinkImage(user.photo_profile)

      const filename = saveImage(req.file.path, req.file.filename)

      value.photo_profile = filename
    }

    await user.update(value)

    return res.status(200).json({
      status: 'success',
      message: 'Successfully Edit Profile'
    })
  } catch (error) {
    logger.error(`ERR: user - edit profile = ${error}`)
    return res.status(500).json({
      status: 'failed',
      mesagge: error
    })
  }
}) as RequestHandler

export const changePassword = (async (req: Request, res: Response) => {
  const { error, value } = changePasswordValidation(req.body)
  if (error) {
    logger.error(`ERR: edit profile - change password = ${error.details}`)
    return res.status(403).json({
      status: 'failed',
      message: error.details
    })
  }

  try {
    const user = await User.findOne({
      where: {
        uuid: res.locals.user.uuid
      }
    })
    if (!user) {
      logger.error('ERR: edit Profile - route = not found')
      return res.status(404).json({
        status: 'failed',
        message: 'user not found'
      })
    }

    const matchPassword = await comparedPassword(value.password, user.password)
    if (matchPassword) {
      return res.status(400).json({
        status: 'failed',
        message: 'password cannot be the same'
      })
    }

    const passwordHashed = await hashedPassword(value.password)

    value.password = passwordHashed

    await user.update(value)

    return res.status(200).json({
      status: 'success',
      message: 'password has been changed'
    })
  } catch (error) {
    logger.error(`ERR: edit profile - change password = ${error}`)
    return res.status(500).json({
      status: 'success',
      message: error
    })
  }
}) as RequestHandler

export const logoutUser = (async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken
  if (!refreshToken) {
    return res.status(401).json({
      status: 'failed',
      message: 'Unauthorized '
    })
  }

  try {
    const user = await User.findOne({
      where: {
        refreshToken
      }
    })
    if (!user) {
      logger.error('ERR: user - logout = Forbidden Access')
      return res.status(403).json({
        status: 'failed',
        message: 'forbidden access'
      })
    }

    await user.update({ refreshToken: null })

    res.clearCookie('refreshToken')

    return res.status(200).json({
      status: 'success',
      message: 'Successfully Logout'
    })
  } catch (error) {
    logger.error(`ERR: user - logout = ${error}`)
    return res.status(500).json({
      status: 'failed',
      mesagge: error
    })
  }
}) as RequestHandler

export const refreshToken = (async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
      return res.status(401).json({
        status: 'failed',
        message: 'Unauthorized '
      })
    }

    const user = await User.findOne({
      where: {
        refreshToken
      }
    })
    if (!user) {
      return res.status(403).json({
        status: 'failed',
        message: 'forbidden access'
      })
    }

    const token = verifyJWT(refreshToken)
    if (!token.decoded) {
      logger.error('ERR: user - refresh = Forbidden Access')
      return res.status(403).json({
        status: 'failed',
        message: 'forbidden access'
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
      { expiresIn: '3d' }
    )

    return res.status(200).json({
      status: 'success',
      data: accessToken
    })
  } catch (error) {
    logger.error(`ERR: user - refresh = ${error}`)
    return res.status(500).json({
      status: 'failed',
      mesagge: error
    })
  }
}) as RequestHandler
