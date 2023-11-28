import {
  Table,
  Column,
  Model,
  DataType,
  NotEmpty,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt
} from 'sequelize-typescript'
import { Optional } from 'sequelize'
import User, { UserAttributes } from './user.model'
import Post, { PostAttributes } from './post.model'

export interface CommentAttributes {
  id?: number
  uuid?: string
  postId: number
  userId: number
  description: string
  createdAt: Date
  updatedAt: Date
}

interface CommentCreationAttributes extends Optional<CommentAttributes, 'id'> {}

@Table({
  timestamps: true,
  tableName: 'comments',
  modelName: 'Comment'
})
class Comment extends Model<CommentAttributes, CommentCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  declare id: number

  @NotEmpty
  @Column({
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false
  })
  declare uuid: string

  @ForeignKey(() => User)
  declare userId: number

  @BelongsTo(() => User)
  declare user: UserAttributes

  @ForeignKey(() => Post)
  declare postId: number

  @BelongsTo(() => Post)
  declare post: PostAttributes

  @NotEmpty
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare description: string

  @CreatedAt
  declare createdAt: Date

  @UpdatedAt
  declare updatedAt: Date
}

export default Comment
