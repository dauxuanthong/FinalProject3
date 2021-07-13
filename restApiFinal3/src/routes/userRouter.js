const express = require('express');
const router = express.Router();
const accountController = require('../app/controllers/AccountController')

// /user/new
router.post('/new', accountController.register);

module.exports = router;