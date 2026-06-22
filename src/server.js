const app=require("./app");
require("./config/db");
const PORT=3000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)});

