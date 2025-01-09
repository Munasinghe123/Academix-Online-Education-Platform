const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

    name: { type: String },
    email: { type: String },
    password: { type: String },
    role: {
        type: String,
        enum: ["admin", "student", "courseProvider"],
        default: "student"
    }

})

module.exports = mongoose.model("User", UserSchema)