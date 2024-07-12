const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const user = require("./controller/userController");
const booking = require("./controller/bookingController");
const errorHandler = require("./middleware/errorHandler");

const app = express();

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: path.join(__dirname, ".env") }); // Define the path to .env file
}

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credential: true,
  })
);

app.use(express.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

app.use("/api", user);
app.use("/api", booking);

app.use(errorHandler);

module.exports = app;
