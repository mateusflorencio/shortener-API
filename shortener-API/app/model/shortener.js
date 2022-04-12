const {
    default: mongoose
} = require("mongoose")

let shortenerSchema = new mongoose.Schema({
    url: {
        type: String,
        require: true
    },
    codUrl: String,
    date_create: {
        type: Date,
        default: Date.now
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    }
});

shortenerSchema.index({
    "name": "text",
    "date_create": Date
});

module.exports = mongoose.model("Url", shortenerSchema);