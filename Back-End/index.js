const express = require("express");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());


const userRouter = require("./Routes/userRoutes");

app.use("/api/v1", userRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}---`);
})