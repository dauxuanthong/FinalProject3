const { OAuth2Client } = require("google-auth-library");
require("dotenv").config({ path: __dirname + "/../../.env" });
const client = new OAuth2Client(process.env.CLIENT_ID);
const User = require("../../database/models/index").user;

class Google {
    //core function
    googleLogin = async (req, res) =>{
        const {token} = req.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        });
        const refresh_token =  ticket.getPayload();
        console.log("REFRESH TOKEN: " ,refresh_token);
        const {name, email} = ticket.getPayload();
        const user = await User.findOrCreate({ 
            where: {email: email},
            defaults:{
                userName: name,
                email: email,
                Password: null,
            }
        });
        return res.send({message: "SUCCESS", username: user[0].userName, id: user[0].id});
    }
};
module.exports = new Google();  
