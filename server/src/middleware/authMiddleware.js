import jwt from 'jsonwebtoken'
import Users from '../models/UserModel.js'

const SECRET = process.env.SECRET
export const sign = (payload) => jwt.sign(payload, SECRET, {expiresIn: 86400})
export const decode = (token) => jwt.decode(token, SECRET)

export const validateToken = async(req,res, next)=>{
    const [, token] = req.headers.authorization.split(' ')
    try {
      const payload = await jwt.verify(token, SECRET)
      const user = await Users.findById(payload.user)

  
      if (!user) {
        return res.status(401).json({message: "Access denied"})
      }
  
      req.auth = user
  
      next()
    } catch (error) {
        return res.status(400).json({message: "Invalid token"})
    }
  }
