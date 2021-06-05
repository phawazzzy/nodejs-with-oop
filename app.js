const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();

// handle cors error
app.use(cors());

dotenv.config();

// set up route here

const { DB_URI } = process.env;

// connect to MongoDB database
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log("mongodb database conneted!")).catch((err) => console.log(err));


app.get("/", (req, res) => res.status(200).json({
    status: true,
    message: "Server running"
}));

// make use of morgan
app.use(logger("dev"));
// allow collection of payload from body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routers


// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 400);
    res.json({ error: err.message, message: "Operation failed" });
});

module.exports = app;