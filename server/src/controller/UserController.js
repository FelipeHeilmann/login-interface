import Users from '../models/UserModel.js'
import * as jwt from '../middleware/authMiddleware.js'
import bcrypt from 'bcrypt' 

class UserController{
    static getUserEmail = async(email)=>{
        return await Users.findOne({email: email})
    }

    static insertUser = async(req,res)=>{
        const {first_name, last_name,email, password} = req.body

        const existUser = await UserController.getUserEmail(email)
        if(existUser){
            return res.status(422).json({message: "this email has already been used"})
        }

        const salt = await bcrypt.genSalt(12)
        const passHash = await bcrypt.hash(password, salt)

        const user = new Users({
            first_name,
            last_name, 
            email, 
            password: passHash
        })

        try{   
            const newUser = await user.save()
            return res.status(200).json({message: "registered user"})
        }
        catch(err){
            return res.status(500).json({message: err.message})
        }
    }

    static loginUser = async(req,res)=>{
        const [, hash] = req.headers.authorization.split(' ')
        const [email, password] = Buffer.from(hash, 'base64').toString().split(':')
        

        const user= await UserController.getUserEmail(email)
        if(!user){
            return res.status(422).json({message: "User was not found"})
        }


        const checkPass = await bcrypt.compare(password, user.password)
        if(!checkPass){
            return res.status(422).json({message: "password incorrect!"})
        }
        try{
            const secret = process.env.SECRET
            const token = jwt.sign({id: user._id,})
            res.cookie('token',token, {httpOnly: true })
            return res.status(201).json({message: "user authenticated"})
        }
        catch(err){
            return res.status(401).json({message: err.message})
        }
    }

}

export default UserController