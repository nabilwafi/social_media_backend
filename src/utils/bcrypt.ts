import bcrypt from 'bcrypt'

const hashedPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10)
}

const comparedPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword)
}

export { hashedPassword, comparedPassword }
