import {
  Table,
  Column,
  Model,
  DataType,
  NotEmpty,
  ForeignKey,
  CreatedAt,
  HasMany,
  BelongsTo,
  UpdatedAt
} from 'sequelize-typescript'
import { Optional } from 'sequelize'
import User, { UserAttributes } from './user.model'
import Comment, { CommentAttributes } from './comment.model'

export interface PostAttributes {
  id?: number
  uuid: string
  title: string
  description: string
  userId: number
  createdAt: Date
  updatedAt: Date
}

interface PostCreationAttributes extends Optional<PostAttributes, 'id'> {}

@Table({
  timestamps: true,
  tableName: 'posts',
  modelName: 'Post'
})
class Post extends Model<PostAttributes, PostCreationAttributes> {
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

  @NotEmpty
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare title: string

  @NotEmpty
  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  declare description: string

  @HasMany(() => Comment)
  declare comments: CommentAttributes[]

  @CreatedAt
  declare createdAt: Date

  @UpdatedAt
  declare updatedAt: Date
}

export default Post
