import express from "express";
const router = express.Router();
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { usermiddleware } from "../Middlewares/userMiddleware.js";

// Importing the zod schema from zod:
import { userSignUpSchema, userSignInSchema } from "../zod.js";

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
                        msg: "User Creation Successfull",
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
                    const token = jwt.sign({ _id: user._id }, process.env.jwt_secret);
                    res.cookie("token", token);
                    res.status(200).json({
                        msg: 'User Authentication Successfull',
                        id: user._id,
                        fullname: user.fullname,
                        email: user.email,
                        userPic: user.picture
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
router.get("/searchusers", usermiddleware, async(req, res) => {
    const filter = req.query.search;
    console.log(filter);
    console.log(req.user);

    try {
        const users = await User.find({
            $or: [{
                fullname: {
                    "$regex": filter
                }
            }, {
                email: {
                    "$regex": filter
                }
            }]
        }).find({
            _id: {
                $ne: req.user
            }
        })
        console.log(users);
        res.status(200).json({
            users
        })
    } catch(err) {
        console.log("Error: " + err);
    }
})

export default router;