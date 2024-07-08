const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { chats } = require("./dummyData/data");

const app = express();
const port = 4001;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    console.log("Hey");
    res.send("Welcome Page")
})
app.get("/chats", (req, res) => {
    res.send("Hey");
    res.send(chats);
})

// const userRouter = require("./Routes/userRoutes");

// app.use("/api/v1", userRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}---`);
})