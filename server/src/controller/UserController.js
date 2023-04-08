import Users from '../models/UserModel.js'
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
            return res.status(200).json(newUser)
        }
        catch(err){
            return res.status(500).json({message: err.message})
        }
    }
}

export default UserController