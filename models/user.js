const mongoose = require("mongoose");

const schema = mongoose.Schema;

const UserSchema = new schema({
    username: {
        type: String,
        required: true,
        maxLength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
        minLength: 4
    },
    session_id: {
        type: String,
        default: null
    },
    date_created: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;