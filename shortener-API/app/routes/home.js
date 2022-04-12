const express = require('express');
const router = express.Router();
const Short = require("../model/shortener");

//redirect
router.get("/:code", async (req, res) => {
    const {
        code
    } = req.params;
    try {
        let url = await Short.findOne({
            codUrl: code
        });
        url.click++;
        await url.save();
        res.redirect(url.url)
    } catch (error) {
        res.sendStatus(500).json({
            error: "not found"
        })
    }
});

module.exports = router;