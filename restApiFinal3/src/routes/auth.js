const express = require("express");
const router = express.Router();
const authController = require("../app/controllers/AuthController");
const google = require("../app/controllers/Google");
const Authenticated = require("../app/controllers/Authenticated");

// /auth/login
router.post("/login", authController.login);

//  /auth/oauth
router.post("/oauth", google.googleLogin);

// /auth/createTk
router.post("/createTk", authController.createJwt);

// /auth/refreshTk
router.get("/refreshTk", authController.refreshToken);

// /auth/logout
router.post("/logout", Authenticated.identifyUser, authController.logout);


module.exports = router;
