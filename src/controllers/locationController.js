const pool = require("../config/db");


const getAllLocations = async (req, res) => {
    try {

        const result = await pool.query("SELECT * FROM locations");

        res.status(200).json({
            success: true,
            count: result.rows.length,
            data: result.rows
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
const getLocationById = async (req, res) => {
    try {

        const id = req.params.id;

        const result = await pool.query(
            "SELECT * FROM locations WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Location not found"
            });
        }

        res.status(200).json({
            success: true,
            data: result.rows[0]
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const addLocation = async (req, res) => {
    try {
        const { name, latitude, longitude } = req.body;
        const lat = parseFloat(latitude);
        const long = parseFloat(longitude);

        if (
            !name ||
            typeof name !== "string" ||
            Number.isNaN(lat) ||
            Number.isNaN(long)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid location data"
            });
        }

        const result = await pool.query(
            `INSERT INTO locations (name, latitude, longitude)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [name, lat, long]
        );

        res.status(201).json({
            success: true,
            data: result.rows[0]
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateLocation = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, latitude, longitude } = req.body;
        const lat = parseFloat(latitude);
        const long = parseFloat(longitude);

        if (
            !name ||
            typeof name !== "string" ||
            Number.isNaN(lat) ||
            Number.isNaN(long)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid location data"
            });
        }

        const result = await pool.query(
            "UPDATE locations SET name = $1, latitude = $2, longitude = $3 WHERE id = $4 RETURNING *",
            [name, lat, long, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Location not found"
            });
        }

        res.status(200).json({
            success: true,
            data: result.rows[0]
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteLocation = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await pool.query(
            "DELETE FROM locations WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Location not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Location deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    getAllLocations,
    getLocationById,
    addLocation,
    updateLocation,
    deleteLocation
};

