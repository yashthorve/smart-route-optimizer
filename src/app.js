const express=require("express");
const app=express();
app.use(express.json());

const locations = [
    {
        id: 1,
        name: "Warehouse",
        latitude: 18.5204,
        longitude: 73.8567
    },
    {
        id: 2,
        name: "Customer A",
        latitude: 18.5314,
        longitude: 73.8446
    },
    {
        id: 3,
        name: "Customer B",
        latitude: 18.5421,
        longitude: 73.8678


        
    },
     {
        id: 4,
        name: "Customer C",
        latitude: 18.5521,
        longitude: 73.8778


        
    }
];


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
app.get("/locations",(req,res)=>{
    res.status(200).json({
        success:true,
        count:locations.length,
        data:locations

    })



});
app.get("/locations/:id",(req,res)=>{
    res.status(200).json({
       "message": "Fetching location by ID"
 })

});
app.post("/locations",(req,res)=>{
    const newLocation=req.body;
    locations.push(newLocation);
    res.status(201).json({
        success:true,
        count:"Location added successfully",
        data:newLocation

    });
})
app.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}`);
    next();
});
module.exports=app;

