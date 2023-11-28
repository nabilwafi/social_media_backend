import Joi from 'joi'
import { UserAttributes } from '../db/models/user.model'

export const RegisterUserValidation = (payload: UserAttributes) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    name: Joi.string().required(),
    bio: Joi.string().required(),
    photo_profile: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })

  return schema.validate(payload)
}
