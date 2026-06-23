const express = require("express");

const router = express.Router();

const { generateOptimizedRoute } = require("../controllers/routeController");

router.get("/optimize", generateOptimizedRoute);

module.exports = router;