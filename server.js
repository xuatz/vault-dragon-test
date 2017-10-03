const express = require("express");
const bodyParser = require("body-parser");

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all("*", (req, res, next) => {
    console.log(req.method + " " + req.url);
    next();
});

//==============================================================

app.use("/object", require("./api/someInfo.js").router);

//==============================================================

app.listen(9000, function() {
    console.log("Example app listening on port 9000!");
});
