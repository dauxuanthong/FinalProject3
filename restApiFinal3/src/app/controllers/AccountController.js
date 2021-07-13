const User = require("../../database/models/index").user;
const bcrypt = require("bcrypt");

class AccountController {
  //CORE FUNCTION
  register = async (req, res) => {
    try {
      const user = {
        userName: req.body.username,
        email: req.body.email,
        Password: req.body.password,
      };
      const userIsExited = await User.findOne({
        where: {
          userName: user.userName
        }
      });
      if(!userIsExited){
        await User.create({
          userName: user.userName,
          email: user.email,
          Password: await bcrypt.hash(user.Password, 10),
        });
        return res.send("Success");
      }
      else{
        return res.send("False");
      }
    }
    catch (error) {
      console.log(`!!!Error at register() core Function: ${error}`);
    }
  }
  //SUB FUNCTION
  
};

module.exports = new AccountController();
