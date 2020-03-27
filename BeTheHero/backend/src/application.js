const express = require("express");
const cors = require("cors");
const { errors } = require("celebrate");
const routes = require("./routes");

const application = express();

application.use(cors());
application.use(express.json());
application.use(routes);
application.use(errors());

module.exports = application;
