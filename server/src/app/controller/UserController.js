import Users from '../models/UserModel.js'
import * as jwt from '../middleware/authMiddleware.js'
import bcrypt from 'bcrypt' 
import crypto from 'crypto'
import mailer from '../../modules/mailer.js'

class UserController{
    static getUsers = async(req,res)=>{
        const {first_name, last_name} = req.auth
        const userName = `${first_name} ${last_name}`
        const users = await Users.find({})
        res.status(200).json({users, userName})
    }
    
    static getUserEmail = async(email)=>{
        return await Users.findOne({email: email})
    }

    static insertUser = async(req,res)=>{
        const {first_name, last_name,email, password} = req.body

        const existUser = await UserController.getUserEmail(email)
        if(existUser){
            return res.status(422).json({message: "This email has already been used"})
        }

        const user = new Users({
            first_name,
            last_name, 
            email, 
            password
        })

        try{   
            const newUser = await user.save()
            return res.status(200).json({message: "Registered user"})
        }
        catch(err){
            console.log("erro aqui")
            return res.status(500).json({message: err.message})
        }
    }

    static loginUser = async(req,res)=>{
        const [, hash] = req.headers.authorization.split(' ')
        const [email, password] = Buffer.from(hash, 'base64').toString().split(':')
        

        const user= await Users.findOne({email:email}).select('+password')
        if(!user){
            return res.status(422).json({message: "User was not found"})
        }


        const checkPass = await bcrypt.compare(password, user.password)
        if(!checkPass){
            return res.status(422).json({message: "Password incorrect!"})
        }
        try{
            const token = jwt.sign({user: user._id,})
            return res.status(201).json({message: "User authenticated", token})
        }
        catch(err){
            return res.status(401).json({message: err.message})
        }
    }

    static forgotPass = async(req,res)=>{
        const {email} = req.body

        try{
            const user= await UserController.getUserEmail(email)
            if(!user){
                return res.status(422).json({message: "User was not found"})
            }
            
            const token = crypto.randomBytes(20).toString('hex')
            const now = new Date()
            now.setHours(now.getHours() + 1)

            await Users.findByIdAndUpdate(user._id,{
                '$set': {
                    passwordResetToken: token,
                    passwordReserExpires:now
                }
            })
            mailer.sendMail({
                to: email,
                from: 'felipeheilmannm@gmail.com',
                template: 'auth/forgot_password',
                context: {token}
            }, (error)=>{
                if(error){
                    console.log(error)
                    return res.status(400).json({message: error.message})
                }
            })
            return res.status(200).json({message: 'ok'})
        }
        catch(error){
            res.status(400).json({message: error.message})
        }
    }

    static resetPass = async(req,res)=>{
        const {email,token, password} = req.body
        try{
            const user = await Users.findOne({email : email}).select('+passwordResetToken passwordResetExpires')
            if(!user){
                return res.status(422).json({message: "User was not found"})
            }

            if(token !== user.passwordResetToken){
                return res.status(400).json({message: 'token invalid'})
            }

            const now = Date()

            if(now > user.passwordResetExpires){
                return res.status(400).json({message: 'token expired, generate a new one'})
            }

            user.password = password
            await user.save()

            return res.status(200).json({message: 'ok'})
            
        }
            
        catch(error){
            console.log(error)
            res.status(400).json({message: 'cannot reset the password, try again'})
        }
    }
}

export default UserController