const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { usermiddleware } = require("../Middlewares/userMiddleware");

// Secret to send while generating the token:
const { jwt_secret } = require("../config");

// Importing the User Schema from database:
const { User } = require("../Database/userSchema");

// Importing the zod schema from zod:
const { userSignUpSchema, userSignInSchema } = require("../zod");

router.post("/signup", async (req, res) => {
    const { fullname, email, password } = req.body;

    try {
        const parsedValue = userSignUpSchema.safeParse({ fullname, email, password });
        if(!parsedValue.success) {
            res.status(511).json({
                msg: "Error while parsing the data!!!"
            })
            return;
        } else {
            // Checking if user already exists in database:
            const existingUser = await User.findOne({ email });
            if(existingUser) {
                res.status(511).json({
                    msg: "User already exists in database"
                })
                return;
            } else {
                // Hashing the password for security reason before sending it to the database:
                const hashedPassword = await bcrypt.hash(password, 10);

                const newUser = await User.create({ 
                    fullname, 
                    email, 
                    password: hashedPassword
                });
                if(!newUser) {
                    res.status(511).json({
                        msg: "User Creation Failed!!"
                    })
                    return;
                } else {
                    res.status(200).json({
                        msg: "User Creation Successfull"
                    })
                }
            }
        }
    } catch(err) {
        console.log("Error Occured: " + err);
        res.status(511).json({
            msg: err
        })
    }
})

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    try {
        const parsedValue = userSignInSchema.safeParse({ email, password });
        if(!parsedValue.success) {
            res.status(511).json({
                msg: "Error while parsing value!!!"
            })
            return;
        } else {
            const user = await User.findOne({ email });
            if(!user) {
                res.status(511).json({
                    msg: "Email not Found!!!"
                })
                return;
            } else {
                const matchedPassword = await bcrypt.compare(password, user.password);
                if(!matchedPassword) {
                    res.status(511).json({
                        msg: "Password is incorrect"
                    })
                    return;
                } else {
                    const token = jwt.sign({ email }, jwt_secret);
                    res.status(200).json({
                        msg: 'User Authentication Successfull',
                        fullname: user.fullname,
                        token: token
                    })
                }
            }
        }
    } catch(err) {
        console.log("Error: " + err);
        res.status(501).json({
            msg: "Error while signin!!!"
        })
        return;
    }
})

router.get("/alluser", usermiddleware, async (req, res) => {
    const allUser = await User.find().select('-password');
    if(!allUser) {
        res.status(511).json({
            msg: "Error while retreving all user!!!"
        })
        return;
    } else {
        res.status(200).json({
            msg: "Users Retreived Successfully...",
            Users: allUser
        })
    }
})

module.exports = router;