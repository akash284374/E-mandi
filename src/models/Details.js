const mongoose = require("mongoose");

const DetailSchema = new mongoose.Schema({
    brandName: String,
    brandIconUrl: String,
    links: [
        {
            label: String,
            url: String
        }
    ]
});

module.exports = mongoose.model("Detail", DetailSchema);
