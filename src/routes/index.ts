import { Application, Router } from 'express'
import authRouter from './auth.router'
import postRouter from './post.router'
import postCommentRouter from './post.comment.router'

const _routes: Array<[string, Router]> = [
  ['/auth', authRouter],
  ['/v1/posts', postRouter],
  ['/v1/posts', postCommentRouter] // Nested Router
]

const routes = (app: Application): void => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}

export default routes
