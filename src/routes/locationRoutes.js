const express=require("express");
const router=express.Router();
const {getAllLocations,getLocationById,addLocation,updateLocation,deleteLocation}=require("../controllers/locationController");
const authenticate=require("../middleware/authMiddleware");

router.get("/",authenticate,getAllLocations);

router.get("/:id",getLocationById);
router.post("/",addLocation);
router.put("/:id",updateLocation);
router.delete("/:id",deleteLocation);   
module.exports=router;