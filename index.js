import express from "express";
import authRoutes from "./routes/auth.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"

dotenv.config();

mongoose.connect(

    'mongodb+srv://smartkings48:ilwOob96LcsQPZo6@bikers.6alpx7u.mongodb.net/?retryWrites=true&w=majority'
).then(()=>{
    console.log("Connected to Database");

    const app = express();

   
    app.use(express.json());
    app.use (cors());
    app.use("/auth", authRoutes)

    app.listen(8080,()=>{
  
        console.log(`server runing on port 8080`);
    })
})
.catch((error)=>{
    console.log(error)
 throw new Error(error)
 });
  




