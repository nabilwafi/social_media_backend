import { verifyJWT } from '../utils/jwt'

import type { Request, Response, NextFunction, RequestHandler } from 'express'

const deserializeToken = ((req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers?.authorization?.replace(/^Bearer\s/, '')
  if (!accessToken) {
    next()
    return
  }

  const token: any = verifyJWT(String(accessToken))
  if (!token.decoded) {
    next()
    return
  }

  if (token.expired) {
    next()
    return
  }

  res.locals.user = token.decoded
  next()
}) as RequestHandler

export default deserializeToken
