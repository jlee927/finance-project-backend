const express = require("express");
const router = express.Router();

const { getAllCategories } = require("../controllers/dashboardController");

router.get("/get-all-categories/:_id", getAllCategories);

module.exports = router;
