import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const salt = await bcrypt.genSalt(12)

const userSchema = mongoose.Schema(
    {
        id: {type: String},
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
            required: true
        },
        password:{
            type: String,
            required: true,
            set: value => bcrypt.hash(value, salt)
        }
    },
    {
        versionKey: false
    }
)
const Users = mongoose.model('user', userSchema)
export default Users