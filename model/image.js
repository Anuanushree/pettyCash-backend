const mongoose = require("mongoose");

const ImageDetailsScehma = new mongoose.Schema(
    {
        image: String,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    },

);

module.exports = mongoose.model("Image", ImageDetailsScehma, "image");