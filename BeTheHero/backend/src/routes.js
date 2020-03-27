const routes = require("express").Router();
const { celebrate, Segments, Joi } = require("celebrate");

const NGOController = require("./controllers/NGOController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

/**
 * Session routes
 */
routes.post("/sessions", celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required()
    })
}), SessionController.create);

/**
 * NGO routes
 */
routes.get("/ngo", NGOController.index);

routes.post("/ngo", celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        fu: Joi.string().required().length(2),
    })
}), NGOController.store);

routes.get("/profile", celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), ProfileController.index);

/**
 * Incidents routes
 */
routes.post("/incident", celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required().min(0),
    }),

    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), IncidentController.store);

routes.get("/incident", celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number().integer().min(1)
    })
}), IncidentController.index);

routes.delete("/incident/:id", celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    }),

    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), IncidentController.delete)


module.exports = routes;
