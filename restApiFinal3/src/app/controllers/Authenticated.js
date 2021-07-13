const jwt = require("jsonwebtoken");

class Authenticated {
    identifyUser = (req, res, next) => {
        //get accessToken (Bearer "token")
        const accessToken = req.header("Authorization");
        //remove Bearer string
        const token = accessToken && accessToken.split(" ")[1];
        // check token is not existed
      if (!token) {
        return res.sendStatus(403);
      };
      const decoded = jwt.decode(token);
      if(!decoded) return res.sendStatus(403);
      //save in session
      req.session.userId = decoded.id;
      return next();
    }
}
module.exports = new Authenticated();