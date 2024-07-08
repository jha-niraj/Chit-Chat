import express from "express";
import { Server } from "socket.io";

import { usermiddleware } from "../Middlewares/userMiddleware.js";
import { Chat } from "../models/chatModel.js";
import { User } from "../models/userModel.js";

const router = express.Router();

router.post("/chat", usermiddleware, async(req, res) => {
    const { userId } = req.body;

    if (!userId) {
        console.log("UserId not sent with the request");
        return res.sendStatus(400);
    }

    let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            {
                users: {
                    $elemMatch: {
                        $eq: req.user
                    }
                }
            },
            {
                users: {
                    $elemMatch: {
                        $eq: userId
                    }
                }
            }
        ]
    }).populate("users", "-password").populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: 'latestMessage.sender',
        select: "fullname picture email"
    })

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        let chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user, userId]
        }
        try {
            const createdChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({
                _id: createdChat._id
            }).populate("users", "-password");
            res.status(200).send(fullChat);
        } catch (err) {
            console.log("Error occurred: " + err);
            throw new Error("During Chart route!!!")
        }
    }
})
router.get("/chat", usermiddleware, async (req, res) => {
    try {
        Chat.find({ users: {
            $elemMatch: {
                $eq: req.user
            }
        } }).populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "name pic email"
                });
                res.status(200).send(results);
            })
    } catch(err) {
        console.log("Errpr: " + err);
    }
})

// Router related to Group:
router.post("/group", usermiddleware, async (req, res) => {
    if(!req.body.users || !req.body.name) {
        return res.status(400).json({
            msg: "Please fill all the fields"
        })
    } 

    let users = JSON.parse(req.body.users);

    if(users.length < 2) {
        return res.status(400).json({
            msg: "More than 2 users are required to form a group chat"
        })
    }
    users.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user
        })
        const fullGroupChat = await Chat.findOne({
            _id: groupChat._id
        })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

        res.status(200).json(fullGroupChat);
    } catch(err) {
        console.log("Error: "+ err);
        throw new Error("Error during Group C")
    }
})
router.post("/rename", usermiddleware, async (req, res) => {

})
router.post("/removegroup", usermiddleware, async (req, res) => {

})
router.post("/groupadd", usermiddleware, async (req, res) => {

})


export default router;