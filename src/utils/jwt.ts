import jwt from 'jsonwebtoken'
import { JWT_SECRET_KEY } from './constant'

export const signJWT = (
  payload: object,
  options?: jwt.SignOptions | undefined
) => {
  return jwt.sign(payload, String(JWT_SECRET_KEY), {
    ...(options && options)
  })
}

export const verifyJWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, String(JWT_SECRET_KEY))
    return {
      valid: true,
      expired: false,
      decoded
    }
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === 'jwt is expired or not eligible to use',
      decoded: null
    }
  }
}
