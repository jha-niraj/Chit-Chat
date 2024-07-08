import jwt from "jsonwebtoken";

export const usermiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            msg: "No token provided, authorization denied"
        });
    }

    try {
        const decodedValue = jwt.verify(token, process.env.jwt_secret);
        if(!decodedValue) {
            res.status(511).json({
                msg: "Error while verifying the value"
            })
            return;
        } else {
            req.user = decodedValue._id;
            next();
        }
    } catch(err) {
        res.status(511).json({
            msg: "Error while retriving the token from headers!!!"
        })
        return;
    }
}
