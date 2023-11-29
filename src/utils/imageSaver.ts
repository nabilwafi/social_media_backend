import { ROOT_PATH } from './constant'
import path from 'path'
import fs from 'fs'

export const saveImage = (pathfile: string, filename: string) => {
  const tmpPath = pathfile

  const targetPath = path.resolve(ROOT_PATH, `public/uploads/${filename}`)

  const src = fs.createReadStream(tmpPath)
  const dest = fs.createWriteStream(targetPath)

  src.pipe(dest)

  return filename
}
