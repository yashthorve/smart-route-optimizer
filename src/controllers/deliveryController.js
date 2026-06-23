const pool = require("../config/db");

const getAllDeliveries = async (req, res) => {
    try {

        const result = await pool.query(`
            SELECT
                deliveries.id,
                deliveries.customer_name,
                deliveries.status,
                locations.name AS location_name,
                locations.latitude,
                locations.longitude
            FROM deliveries
            JOIN locations
            ON deliveries.location_id = locations.id
        `);

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
const getDeliveryById = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await pool.query(
            `SELECT
                deliveries.id,
                deliveries.customer_name,
                deliveries.status,
                locations.name AS location_name,
                locations.latitude,
                locations.longitude
             FROM deliveries
             JOIN locations
             ON deliveries.location_id = locations.id
             WHERE deliveries.id = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Delivery not found"
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

const createDelivery = async (req, res) => {
    try {

        const { customer_name, location_id } = req.body;

        const result = await pool.query(
            `INSERT INTO deliveries(customer_name, location_id)
             VALUES($1,$2)
             RETURNING *`,
            [customer_name, location_id]
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
const updateDelivery = async (req, res) => {

    try {

        const id = req.params.id;
        const { customer_name, location_id, status } = req.body;

        const result = await pool.query(
            `UPDATE deliveries
             SET customer_name=$1,
                 location_id=$2,
                 status=$3
             WHERE id=$4
             RETURNING *`,
            [customer_name, location_id, status, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Delivery not found"
            });
        }

        res.json({
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
const deleteDelivery = async (req, res) => {

    try {

        const id = req.params.id;

        const result = await pool.query(
            `DELETE FROM deliveries
             WHERE id=$1
             RETURNING *`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Delivery not found"
            });
        }

        res.json({
            success: true,
            message: "Delivery deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    getAllDeliveries,
    getDeliveryById,
    createDelivery,
    updateDelivery,
    deleteDelivery
};