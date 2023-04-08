import mongoose from "mongoose";

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
        }
    },
    {
        versionKey: false
    }
)
const Users = mongoose.model('user', userSchema)
export default Users