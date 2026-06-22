
require("dotenv").config();
console.log(process.env.JWT_SECRET);
const app=require("./app");
require("./config/db");
const PORT=3000;

console.log(process.env.JWT_SECRET);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)});

