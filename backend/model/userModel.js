const mongosee = require("mongoose");
const Schema = mongosee.Schema;

const userSchema = new Schema ({
    email: {type: String, require: true, unique: true},
    hashPassword: {type: String, require: true },
    username: {type: String, require: true, unique: true},
    avatarUrl: {type: String},
    fullName: {type: String}
}, {
    timestamps: true
});

module.exports = mongosee.model("User", userSchema);