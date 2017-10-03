const express = require("express");
const router = express.Router({ mergeParams: true });

const { isValueValid } = require("../utils.js");
const SomeInfo = require("../models/someInfo.js");

// POST /data
router.post("/", (req, res) => {
    if (!req.body) {
        res.status(500).send("Data cannot be empty!");
        return;
    }

    for (let key in req.body) {
        if (!key) {
            res.status(500).send("Key cannot be empty!");
            return;
        }

        let value = req.body[key];

        if (!isValueValid(value)) {
            res.status(500).send("Value format is not valid!");
            return;
        }

        let timestamp = new Date().getTime();
        SomeInfo.create({
            key,
            value,
            timestamp
        })
            .then(someInfo => {
                res.json({
                    key: someInfo.key,
                    value: someInfo.value,
                    timestamp: new Date(someInfo.timestamp).getTime()
                });
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(500);
            });
    }
});

// GET /object/:key?timestamp=1440568980
router.get("/:key", (req, res) => {
    let query = {};
    for (let key in req.params) {
        req.params[key] !== undefined ? (query[key] = req.params[key]) : null;
    }

    // ========================================

    // set timestamp from request query field if available, otherwise get current time
    let { timestamp = new Date().getTime() } = req.query;

    // ========================================

    SomeInfo.findOne(query)
        .where("timestamp")
        .lte(timestamp)
        .sort("-timestamp")
        .exec()
        .then(someInfo => {
            if (someInfo) {
                res.json({
                    value: someInfo.value
                });
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

module.exports = {
    router
};
