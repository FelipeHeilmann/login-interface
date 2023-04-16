import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema(
    {
        id: {
            type: String,
            select: false 
        },
        first_name:{
            type: String,
            required: true
        },
        last_name:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password:{
            type: String,
            required: true,
            select: false
        },
        passwordResetToken:{
            type: String,
            select: false
        },
        passwordReserExpires:{
            type: Date,
            select: false  
        },
        created_at:{
            type: Date,
            default: Date.now
        }

    },
    {
        versionKey: false
    }
)
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(12)
    const passHash = await bcrypt.hash(this.password, salt)
    this.password = passHash
    next()
})

const Users = mongoose.model('user', userSchema)
export default Users