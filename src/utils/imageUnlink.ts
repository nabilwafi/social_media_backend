import fs from 'fs'
import path from 'path'
import { ROOT_PATH } from './constant'

export const unlinkImage = (filename: string) => {
  fs.unlinkSync(path.join(ROOT_PATH, 'public/uploads/', filename))
}
