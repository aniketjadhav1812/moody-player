import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("Connected to DB");
    })
    .catch((err)=>{
        console.log("Unable to connect DB: ",err);
    })
}

export default connectDB;