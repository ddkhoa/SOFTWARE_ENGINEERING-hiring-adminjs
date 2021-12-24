const express = require("express");
const router = express.Router();
const statsService = require("./stats.service");
router.get("/", async function (req, res, next) {

    try {

        const data = await statsService.getStats();
        res.json({ success: true, data });
    } catch (error) {

        next(error);
    }
})

module.exports = router;