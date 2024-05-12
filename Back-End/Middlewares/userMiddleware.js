const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config");

const usermiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    try {
        const actualToken = token.split(" ")[1];
        if(!actualToken) {
            res.status(511).json({
                msg: "Token not received!!!"
            })
            return;
        } else {
            const decodedValue = jwt.verify(actualToken, jwt_secret);
            if(!decodedValue) {
                res.status(511).json({
                    msg: "Error while verifying the value"
                })
                return;
            } else {
                next();
            }
        }
    } catch(err) {
        res.status(511).json({
            msg: "Error while retrivng the token from headers!!!"
        })
        return;
    }
}

module.exports = {
    usermiddleware
}