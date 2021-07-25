const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const fs = require("fs");
const util = require("util");
const baseUrl = "http://localhost:3001/";

class PostController {
  createPost = (req, res) => {
    const data = {
      userId: req.session.userId,
      // productName: req.body.productName,
      // productType: req.body.productType,
      // startPrice: req.body.startPrice,
      // auctionAt: req.body.auctionAt,
      // description: req.body.description,
      // img: req.body.img,
      post: req.post,
    };
    console.log(data);
    // console.log(typeof data.img[0])
    // console.log(data.img[0]);
  };

  test = (req, res) => {
    const test = req.body.files;
    console.log(test);
  };

  imgUpload = async (req, res) => {
    const userId = req.session.userId;
    const dir = __basedir + `/public/${userId}`;
    !fs.existsSync(dir) && fs.mkdirSync(dir);
    let fileName = [];

    let storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, __basedir + `/public/${userId}`);
      },
      filename: (req, file, cb) => {
        console.log(file.originalname);
        fileName.push(file.originalname);
        cb(null, file.originalname);
      },
    });

    let uploadFile = multer({
      storage: storage,
      limits: { fileSize: maxSize },
    }).array("file");

    let uploadFileMiddleware = util.promisify(uploadFile);
    await uploadFileMiddleware(req, res);
    const directoryPath = __basedir + `/public/${userId}`;

    let fileInfos = [];
    fileName.map((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + `/${userId}/` + file,
      });
    });
    res.status(200).json({ fileInfos });
    // fs.readdir(directoryPath, function (err, files) {
    //     if (err) {
    //       res.status(500).send({
    //         message: "Unable to scan files!",
    //       });
    //     }

    //     let fileInfos = [];

    //     fileName.forEach((file) => {
    //       fileInfos.push({
    //         url: baseUrl + file,
    //       });
    //     });

    //     res.status(200).json({fileInfos});
    //   });
  };
}
module.exports = new PostController();
