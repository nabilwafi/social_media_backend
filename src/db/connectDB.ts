import { Sequelize } from 'sequelize-typescript'
import {
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_DIALECT,
  DB_HOST,
  DB_PORT
} from '../utils/constant'
import path from 'path'
import { Dialect } from 'sequelize'

const db = new Sequelize({
  database: DB_NAME,
  dialect: DB_DIALECT as Dialect,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: Number(DB_PORT),
  models: [path.join(__dirname, '/models')],
  logging: false
})

export default db
