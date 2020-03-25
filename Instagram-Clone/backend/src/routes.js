const routes = require("express").Router();
const uploadConfig = require("./config/upload");
const multer = require("multer")(uploadConfig);

const PostController = require("./controllers/PostController");
const LikeController = require("./controllers/LikeController");

routes.get("/posts", PostController.index);
routes.post("/posts", multer.single("image"), PostController.store);

routes.post("/posts/:id/like", LikeController.store);

module.exports = routes;
