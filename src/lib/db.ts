import mongoose from "mongoose";
const db = async()=>{
    if(mongoose.connection.readyState === 1){
        console.log("db already connected")
        return mongoose.connection
    }else{
        try{
        const conn = await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string)
       console.log("db connected")
        return conn.connection
        }catch(err){
            console.log(err)
        }
    }
}
    
export default db