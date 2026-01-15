require('dotenv').config()
const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET; 


function AuthMiddlware(req, res, next) {
    const headers = req.headers;
    const authorization = headers["authorization"];
    const token = authorization && authorization.split(" ")[1];

   if(!token) {
    res.status(401).json({
        message: "UNAUTHORIZED REQUEST"
    });
   } else {
        jwt.verify(token, JWT_SECRET, (error, decodedString) => {
            if(error) {
                res.status(401).json({
                    error,
                    message: "INVALID TOKEN PROVIDED"
                })
            } else {
                req.email = decodedString.email;
                next();
            }
        })

   }
}


module.exports = {AuthMiddlware};