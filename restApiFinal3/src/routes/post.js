const express = require("express");
const router = express.Router();
const Authenticated = require("../app/controllers/Authenticated");
const postController = require("../app/controllers/PostController");

// /post/create
router.post("/create", Authenticated.identifyUser, postController.createPost);

// router.post("/test", Authenticated.identifyUser, postController.test);

router.post("/imgUpload", Authenticated.identifyUser, postController.imgUpload);




module.exports = router;