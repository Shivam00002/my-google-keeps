const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
    },
});

const User = mongoose.model("user", UserSchema);

module.exports = { User };
