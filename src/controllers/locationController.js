const locations = require("../data/locations");


const getAllLocations = (req,res)=>{
    res.status(200).json({
        success:true,
        count:locations.length,
        data:locations  

    })
}

const getLocationById = (req,res)=>{
    const id = Number(req.params.id);
    const location = locations.find(loc => loc.id === id);      
    if (!location) {
        return res.status(404).json({
            success: false,
            message: "Location not found"
        });
    }else{
        res.status(200).json({
            success: true,
            data: location
        });
    }       

}

const addLocation = (req,res)=>{
    const newLocation=req.body;
    if(!newLocation.name ||typeof newLocation.latitude !== "number" || typeof newLocation.longitude !== "number"){          
        return res.status(400).json({
            success:false,
            message:"Invalid location data. Please provide name, latitude, and longitude properly"
        });
    }
    locations.push(newLocation);
    res.status(201).json({
        success:true,
        count:"Location added successfully",
        data:newLocation

    });     
}

const updateLocation = (req,res)=>{     
    const id=Number(req.params.id);
    const location=locations.find(loc=>loc.id===id);
    if (!location) {                    
        return res.status(404).json({
            success: false,
            message: "Location not found"
        });
    }   
    location.name=req.body.name || location.name;
    location.latitude=req.body.latitude || location.latitude;
    location.longitude=req.body.longitude || location.longitude;
    res.status(200).json({
        success: true,
        message: "Location updated successfully",
        data: location
    });     
}


const deleteLocation = (req,res)=>{
    const id=Number(req.params.id);
    const index=locations.findIndex(loc=>loc.id===id);
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Location not found"
        });
    }
    locations.splice(index, 1);
    res.status(200).json({
        success: true,
        message: "Location deleted successfully"
    });
}

module.exports={
    getAllLocations,
    getLocationById,    
    addLocation,
    updateLocation,
    deleteLocation
};

