const routes = require("express").Router();

const NGOController = require("./controllers/NGOController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

routes.post("/sessions", SessionController.create);

routes.get("/ngo", NGOController.index)
routes.post("/ngo", NGOController.store);

routes.get("/incident", IncidentController.index);
routes.post("/incident", IncidentController.store);
routes.delete("/incident/:id", IncidentController.delete)

routes.get("/profile", ProfileController.index);

module.exports = routes;
