import jwt from 'jsonwebtoken'

const SECRET = process.env.SECRET
export const sign = (payload) => jwt.sign(payload, SECRET, {expiresIn: 86400})
export const decode = (token) => jwt.decode(token, SECRET)