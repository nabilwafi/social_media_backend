import { PostAttributes } from '../db/models/post.model'
import Joi from 'joi'

export const PostValidation = (
  payload: Pick<PostAttributes, 'title' | 'description' | 'userId'>
) => {
  const schema = Joi.object({
    userId: Joi.number().required(),
    title: Joi.string().required(),
    description: Joi.string().required()
  })

  return schema.validate(payload)
}
