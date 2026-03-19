import express from "express";
import cors from "cors";
import connectdb from "./Config/db.js";
import dotenv from "dotenv";

import JobRoutes from "./Routes/Jobroutes.js";
import ApplicationRoutes from "./Routes/ApplicationRoutes.js";
import AuthRoutes from "./Routes/Authroutes.js";

dotenv.config();


const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: "https://job-portal-main-project-1.vercel.app",
  credentials: true,
}));

// Routes
app.use("/api/auth",AuthRoutes)
app.use("/api/jobs", JobRoutes);
app.use("/api/applications", ApplicationRoutes); 

// Test
app.get("/", (req, res) => {
  res.send("backend connected");
});

// Connect DB


// Listen
const port = process.env.PORT || 5000;
const StartServer=async()=>{
    try{
        await connectdb()
       if(connectdb) console.log("db connected")
        app.listen(port, () => {
  console.log("Port is Running Successfully");
});

    }catch(err){
        console.log("error in connecting database")
    }
}
StartServer()
