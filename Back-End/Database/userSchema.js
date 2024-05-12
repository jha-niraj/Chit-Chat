const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

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