const express = require("express");
const router = express.Router();
const fileController = require("../app/controllers/FileController");

// /file/upload
router.post("/upload", fileController.upload);
// /file/files
router.get("/files", fileController.getListFiles);
// /file/download:pram
router.get("/files/:name", fileController.download);

module.exports = router;