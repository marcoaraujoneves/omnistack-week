const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const application = express();

application.use(cors());
application.use(express.json());
application.use(routes);

application.listen(3333);
