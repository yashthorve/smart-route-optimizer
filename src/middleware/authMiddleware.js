const jwt=require("jsonwebtoken");

const authenticate=(req,res,next)=>{

const authHeader=req.headers.authorization;

if(!authHeader){

return res.status(401).json({

success:false,

message:"No token"

});

}

const token=authHeader.split(" ")[1];

try{

const decoded=jwt.verify(

token,

process.env.JWT_SECRET || 'fallback_secret_key_123'

);

req.user=decoded;

next();

}

catch{

res.status(401).json({

success:false,

message:"Invalid token"

});

}

};

module.exports=authenticate;