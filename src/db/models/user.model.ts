import {
  Table,
  Column,
  Model,
  DataType,
  NotEmpty,
  Length,
  IsEmail,
  HasMany,
  CreatedAt,
  UpdatedAt
} from 'sequelize-typescript'
import { Optional } from 'sequelize'
import Post, { PostAttributes } from './post.model'

export interface UserAttributes {
  id?: number
  uuid?: string
  username: string
  name: string
  bio: string
  photo_profile: string
  email: string
  password?: string
  refreshToken?: string | null
  createdAt?: Date
  updatedAt?: Date
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

@Table({
  timestamps: true,
  tableName: 'users',
  modelName: 'User'
})
class User extends Model<UserAttributes, UserCreationAttributes> {
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

  @HasMany(() => Post)
  declare posts: PostAttributes[]

  @NotEmpty
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare username: string

  @NotEmpty
  @Length({ min: 3, max: 100 })
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare name: string

  @NotEmpty
  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  declare bio: string

  @NotEmpty
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare photo_profile: string

  @NotEmpty
  @IsEmail
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  declare email: string

  @NotEmpty
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare password: string

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  declare refreshToken: string

  @CreatedAt
  declare createdAt: Date

  @UpdatedAt
  declare updatedAt: Date
}

export default User
