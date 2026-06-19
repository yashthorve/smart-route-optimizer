const express=require("express");
const app=express();


app.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get("/",(req,res)=>{
    res.send("Welcome to  route optimizer ");
})
app.get("/about",(req,res)=>{
    res.send("This backend calculates optimized delivery routes.");
})
app.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}`);
    next();
});
module.exports=app;

