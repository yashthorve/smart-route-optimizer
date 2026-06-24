const axios = require("axios");
const pool = require("../config/db");

const generateOptimizedRoute = async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT * FROM locations ORDER BY id"
        );

        const locations = result.rows;

        const matrix = [];

        for (let i = 0; i < locations.length; i++) {

            matrix[i] = [];

            for (let j = 0; j < locations.length; j++) {

                if (i === j) {
                    matrix[i][j] = 0;
                } else {

                    const lat =
                        locations[i].latitude - locations[j].latitude;

                    const lon =
                        locations[i].longitude - locations[j].longitude;

                    matrix[i][j] = Math.round(
                        Math.sqrt(lat * lat + lon * lon) * 1000
                    );
                }
            }
        }

        let pythonServiceUrl = process.env.PYTHON_SERVICE_URL || "http://127.0.0.1:5000";
        // Ensure the URL ends with /optimize
        if (!pythonServiceUrl.endsWith('/optimize')) {
            pythonServiceUrl = `${pythonServiceUrl.replace(/\/$/, '')}/optimize`;
        }

        const response = await axios.post(
            pythonServiceUrl,
            {
                distanceMatrix: matrix
            }
        );

        const optimizedRoute =
            response.data.route.map(index => locations[index]);

        res.json({
            success: true,
            optimizedRoute
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