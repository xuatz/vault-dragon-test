const express = require("express");
const bodyParser = require("body-parser");
const SomeInfo = require("./models/someInfo.js");

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all("*", (req, res, next) => {
    console.log(req.method + " " + req.url);
    next();
});

//==============================================================

// POST /data
app.post("/object", (req, res) => {
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

        if (!value) {
            res.status(500).send("Value cannot be empty!");
            return;
        }

        let timestamp = new Date().getTime();
        console.log(timestamp);
        SomeInfo.create({
            key,
            value,
            timestamp
        })
            .then(someInfo => {
                console.log(someInfo);
                let medate = new Date(someInfo.timestamp * 1000);
                console.log(medate.toTimeString());
                console.log(medate.toISOString());
                console.log(medate.toLocaleTimeString());
                res.json({
                    key: someInfo.key,
                    value: someInfo.value,
                    timestamp: someInfo.timestamp
                });
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(500);
            });
    }
});

// GET /object/:key?timestamp=1440568980
app.get("/object/:key", (req, res) => {
    let query = {};
    for (let key in req.params) {
        req.params[key] !== undefined ? (query[key] = req.params[key]) : null;
    }

    // ========================================

    let { timestamp = new Date().getTime() } = req.query;

    // ========================================

    SomeInfo.findOne(query)
        .where("timestamp")
        .lte(timestamp)
        .sort("-timestamp")
        .exec()
        .then(someInfo => {
            console.log(someInfo);
            if (someInfo) {
                res.json({
                    [someInfo.key]: someInfo.value
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

// GET /data/:key?timestamp=1237367

app.listen(9000, function() {
    console.log("Example app listening on port 9000!");
});
