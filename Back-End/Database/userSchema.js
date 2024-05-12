const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://jhaniraj45:EM26awsTr4nB5aik@cluster-1.vikopuu.mongodb.net/user");

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        require: true,
        minLength: 5,
        maxLength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model("User", userSchema);

module.exports = {
    User
}