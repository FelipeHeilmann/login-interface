import mongoose from "mongoose";

const DB_URI = process.env.MONGO_URI

mongoose
    .connect(DB_URI)
    .then(()=>{
        console.log("connected with database")
    })
    .catch((error)=>{
        console.log(error)
    })

const db = mongoose.connection

export default db