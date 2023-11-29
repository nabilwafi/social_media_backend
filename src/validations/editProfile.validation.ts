import { UserAttributes } from '../db/models/user.model'
import Joi from 'joi'

export const editProfileValidation = (
  payload: Pick<UserAttributes, 'username' | 'name' | 'bio' | 'email'>
) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    name: Joi.string().required(),
    bio: Joi.string().required(),
    email: Joi.string().required()
  })

  return schema.validate(payload)
}
