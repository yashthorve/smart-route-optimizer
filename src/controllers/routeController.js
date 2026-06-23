const pool = require("../config/db");
const optimizeRoute = require("../services/routeOptimizationService");

const generateOptimizedRoute = async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT * FROM locations"
        );

        const optimizedRoute = optimizeRoute(result.rows);

        res.status(200).json({
            success: true,
            totalStops: optimizedRoute.length,
            route: optimizedRoute
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    generateOptimizedRoute
};