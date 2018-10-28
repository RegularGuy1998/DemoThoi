const mongosee = require("mongoose");
const Schema = mongosee.Schema;

const commentSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    content: { type: String, require: true },
},{
    timestamps: true
});

const imageSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    imageUrl: { type: String, require: true },
    description: { type: String },
    view: { type: Number, default: 0 },
    like: { type: Number, default: 0 },
    comment: [commentSchema],
}, {
        timestamps: true
    });

module.exports = mongosee.model("Image", imageSchema);