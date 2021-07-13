const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config({ path: __dirname + "/../../.env" });
const User = require("../../database/models/index").user;
const Token = require("../../database/models/index").token;


class AuthController {
  //core function
  login = async (req, res) => {
    try {
      const reqUser = {
        userName: req.body.username,
        Password: req.body.password,
      };
      //check userName
      const user = await User.findOne({
        where:{userName: reqUser.userName}
      });
      if (!user) {
        console.log("User is not exit");
        return res.json({ message: "FAILED" });
      }
      //check password
      const checkPass = await bcrypt.compareSync(reqUser.Password, user.Password);
      if (!checkPass) {
        console.log("Wrong password");
        return res.json({ message: "FAILED" });
      }
      return res.send({ message: "SUCCESS", username: user.userName, id: user.id });
    } catch (error) {
      console.log("!!!Error at login core function: ", error);
      return res.json({ message: "FAILED" });
    }
  };

  createJwt = async (req, res) => {
    try {
      const reqUser = {
        id: req.body.id,
        userName: req.body.username,
      };
      //generating token
      //access token
      const accessToken = jwt.sign({id: reqUser.id, userName: reqUser.userName}, process.env.ACCESS_TOKEN, {
        expiresIn: "15m", //15 minutes
      });
      const refreshToken = jwt.sign({id: reqUser.id, userName: reqUser.userName}, process.env.SECRET_ACCESS_TOKEN, {
        expiresIn: "1d", //1 day
      });
      //find userId in tokens
      let user = await Token.findOne({
        where: { userId: reqUser.id },
        raw: true,
      });
      if (!user) {
        // create new
        user = await Token.create({
          userId: reqUser.id,
          refreshTk: refreshToken,
        });
      } else {
        //update
        user = await Token.update(
          { refreshTk: refreshToken },
          {
            where: { userId: reqUser.id },
          }
        );
      }
      res.cookie("refreshToken", refreshToken, { signed: true }).json({accessToken});
    } catch (error) {
      console.log("!!!ERROR at createJwt core function: ", error);
    }
  };

  refreshToken = async (req, res) => {
    try {
      const refreshTokenReq = req.signedCookies["refreshToken"];
      const decoded = jwt.decode(refreshTokenReq);
      if(!decoded) return res.sendStatus(403);
      //generating token from
      //access token 
      const accessToken = jwt.sign({id: decoded.id, userName: decoded.userName}, process.env.ACCESS_TOKEN, {
        expiresIn: "15m", //15 minutes
      });
      //refresh token 
      const refreshToken = jwt.sign({id: decoded.id, userName: decoded.userName}, process.env.SECRET_ACCESS_TOKEN, {
        expiresIn: "1d", //1 day
      });
      //update data base
      await Token.update({refreshTk: refreshToken},{
        where: {userId: decoded.id}
      })
      console.log("Already refresh token")
      return res.cookie("refreshToken", refreshToken, { signed: true }).json({accessToken});
    } 
    catch (error) {
      console.log("!!!Error at refreshToken core function: ", error);
      return res.sendStatus(403);
    }
  }

  logout = async(req, res)=>{
    try {
      const userId = req.session.userId;
      //remover refreshToken in database
      await User.update({refreshTk: ""},{
        where: {userId: userId}
      });
      return res.sendStatus(200);
    } catch (error) {
      console.log("!!!Error at logout core function: ", error)
      return res.sendStatus(404);
    }
  };
}

module.exports = new AuthController();

