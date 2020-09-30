const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        default: "None"
    },
    role: {
        type: String,
        required: true,
        default: "CLIENT"
    }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;