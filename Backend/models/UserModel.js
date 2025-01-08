const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

    name: { type: String },
    email: { type: String },
    password: { type: String },
    role: {
        type: String,
        enum: ["admin", "user", "courseProvider"],
        default: "user"
    }

})

module.exports = mongoose.model("User", UserSchema)