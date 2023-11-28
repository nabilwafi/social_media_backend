import { UserAttributes } from '../db/models/user.model'
import Joi from 'joi'

export const LoginUserValidation = (
  payload: Pick<UserAttributes, 'email' | 'password'>
) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })

  return schema.validate(payload)
}
