const express = require('express');
const router = express.Router();
const WithAuth = require("../middlewares/auth");
const Short = require("../model/shortener");
const generateCode = require("../middlewares/code")

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
});

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

router.put(("/:codUrl"), WithAuth, async (req, res) => {
    const url = req.body.url;
    const codUrl = req.params.codUrl;

    try {
        let shortener = await Short.findOne({
            codUrl: codUrl
        });
        if (isOwner(req.user, shortener)) {
            let shortener = await Short.findOneAndUpdate({
                codUrl: codUrl
            }, {
                $set: {
                    url: url
                }
            }, {
                upsert: true,
                "new": true
            });
            res.json(shortener);
        } else {
            res.status(403).json({
                error: "Permission denied"
            });
        };
    } catch (error) {
        res.status(500).json({
            error: `"Problem to update ${error}`
        });
    };
});

function isOwner(user, shortener) {
    if (JSON.stringify(user._id) == JSON.stringify(shortener.author))

        return true;
    else {
        return false;
    };
};



module.exports = router;