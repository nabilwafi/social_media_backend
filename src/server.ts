import express, { Application, Request, Response, NextFunction } from 'express'
import logger from './utils/logger'

import routes from './routes'
import { ALLOWED_ORIGIN, PORT_SERVER } from './utils/constant'

import cookieParser from 'cookie-parser'
import cors from 'cors'
import deserializeToken from './middlewares/deserializeToken'

import './db/connectDB'

const app: Application = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use((req: Request, res: Response, next: NextFunction): void => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: ALLOWED_ORIGIN as string
  })
)
app.use('/public', express.static('src/public'))
app.use(deserializeToken)

routes(app)

app.listen(PORT_SERVER, () => {
  logger.info(`Server is running on port ${PORT_SERVER}`)
})
