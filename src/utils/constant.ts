import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

const {
  PORT_SERVER,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_DIALECT,
  DB_PORT,
  JWT_SECRET_KEY,
  ALLOWED_ORIGIN
} = process.env

const ROOT_PATH = path.resolve(__dirname, '..')

export {
  PORT_SERVER,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_DIALECT,
  DB_PORT,
  JWT_SECRET_KEY,
  ALLOWED_ORIGIN,
  ROOT_PATH
}
