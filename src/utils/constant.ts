import dotenv from 'dotenv'

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

export {
  PORT_SERVER,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_DIALECT,
  DB_PORT,
  JWT_SECRET_KEY,
  ALLOWED_ORIGIN
}
