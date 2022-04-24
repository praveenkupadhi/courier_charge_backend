const express = require("express");
const cors = require("cors");
const app = express();

const pincodesController = require("./controllers/pincodesController");
const ratesController = require("./controllers/ratesController");
const inputDataController = require("./controllers/inputDataController");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/pincodes", pincodesController);
app.use("/rates", ratesController);
app.use("/", inputDataController);

module.exports = app;
