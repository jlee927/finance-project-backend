const express = require("express")
const router = express.Router()

const { 
    getRevenue,
    addRevenue,
    deleteRevenue
 } = require("../controllers/revenueController")

router.get("/get-revenue/:_id/:rev_period?", getRevenue) 
router.post("/add-revenue", addRevenue)
router.delete("/delete-revenue/:_id", deleteRevenue)

module.exports = router