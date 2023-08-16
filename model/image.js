const mongoose = require("mongoose");

const ImageDetailsScehma = new mongoose.Schema(
    {
        image: String
    },
);

module.exports = mongoose.model("Image", ImageDetailsScehma, "image");