const express = require('express');
const router = express.Router();
const WithAuth = require("../middlewares/auth");
const Short = require("../model/shortener");


router.get("/", WithAuth, async (req, res) => {
    try {
        let url = await Short.find({
            author: req.user_id
        });

    } catch (error) {
        res.status(500).json({
            error: " problem to get"
        })
    }

})


module.exports = router;