import { UserAttributes } from '../db/models/user.model'
import Joi from 'joi'

export const changePasswordValidation = (
  payload: Pick<UserAttributes, 'password'>
) => {
  const schema = Joi.object({
    password: Joi.string().required()
  })

  return schema.validate(payload)
}
