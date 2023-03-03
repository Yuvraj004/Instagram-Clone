const jwt = require("jsonwebtoken");
//taking out the jwt key
require("dotenv").config({ path: "backend/.env" });
const JWT_KEY = "" + process.env.JWT_KEY;
//accessing the user model
const User = require("../models/user");

module.exports = async (req, res, next) => {
    const auth = await req.headers.authorization;
    //auth === Bearer ewedfanwoir
    if (!auth) {
        return res.status(401).json({ error: "You must be auth logged in" });
    }
    //destructuring the token
    const token = (auth.replace("Bearer ", "")).toString();
    //verifying the token
    jwt.verify(token, JWT_KEY, (err,payload) => {

        if (err) {
            return res.status(401).json({ error: err });
        }
        //finding the userdata using the id from above
        const { _id } = payload;
        User.findById(_id).then(userdata => {
            req.user = userdata;
            next();
        });
    });
}
