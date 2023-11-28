import type { Request, Response, NextFunction } from 'express'

export const requireUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user
  if (!user) {
    return res.send(401).json({
      status: 'failed',
      message: 'Unauthorized'
    })
  }

  next()
}
