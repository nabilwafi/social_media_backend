import { CommentAttributes } from '../db/models/comment.model'
import Joi from 'joi'

export const CommentValidation = (
  payload: Pick<CommentAttributes, 'description' | 'userId'>
) => {
  const schema = Joi.object({
    userId: Joi.number().required(),
    description: Joi.string().required()
  })

  return schema.validate(payload)
}
