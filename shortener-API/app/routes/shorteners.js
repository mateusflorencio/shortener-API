const express = require('express');
const router = express.Router();
const WithAuth = require("../middlewares/auth");
const Short = require("../model/shortener");
const generateCode = require("../middlewares/code")


router.post("/new", WithAuth, async (req, res) => {
    const {
        url
    } = req.body;

    try {
        let urlshort = generateCode();
        let dateUrl = new Short({
            url: url,
            codUrl: urlshort,
            author: req.user._id
        });
        await dateUrl.save();
        res.json(dateUrl);

    } catch (err) {
        res.status(500).json({
            err: `${err}`
        })
    }



});

router.get("/", WithAuth, async (req, res) => {
    try {
        let urls = await Short.find({
            author: req.user._id
        });

        res.json(urls)

    } catch (error) {
        res.status(500).json({
            error: " problem to get"
        });
    };
});

router.get("/:code", async (req, res) => {
    const {
        code
    } = req.params;
    try {
        let url = await Short.findOne({
            codUrl: code
        });
        res.redirect(url.url)
    } catch (error) {
        res.sendStatus(500).json({
            error: "not found"
        })
    }
})


module.exports = router;