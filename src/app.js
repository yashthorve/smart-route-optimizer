const express=require("express");
const app=express();
const authRoutes=require("./routes/authRoutes");



const locationRoutes=require("./routes/locationRoutes");
app.use(express.json());
app.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}`);
    next();
});
app.get("/",(req,res)=>{
    res.status(200).json({success:true,
        message:"Welcome to the optimized delivery route API!"
    });
})
app.get("/health",(req,res)=>{
    res.status(200).json({success:true,
        message:"Server is running"
    });
})
app.get("/about",(req,res)=>{
    res.json({
        project: "Smart Route Optimizer",
        version: "1.0.0",
        author: "Yash"})
        
})
app.use("/locations",locationRoutes);
app.use("/auth",authRoutes);
module.exports=app;

