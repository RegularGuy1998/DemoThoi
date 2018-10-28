const express = require("express");
const bp = require("body-parser");
const mongoose = require("mongoose");
const apiRouter = require("./routers/apirouter");
const session = require("express-session");
const lodash = require("lodash");

const cors = require('cors');


let app = express();
const port = 6969;


app.use(session({
    secret: 'Thu hai la ngay dau tuan',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: false
    }
}));
app.use(cors({
    credentials: true,
    origin: true
}));
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());
app.use("/api", apiRouter);
app.use(express.static("./public"));


app.get("/", (req, res) => {
    res.resFile("/index.html");
});

mongoose.connect("mongodb://localhost/techkids-hotgirls", (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Server connect")
    }
})

app.listen(port, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Server is listening at ${port}`);
    }
})