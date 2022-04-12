const {
    default: mongoose
} = require("mongoose")
const moment = require("moment");

let shortenerSchema = new mongoose.Schema({
    url: {
        type: String,
        require: true
    },
    codUrl: String,
    date_create: {
        type: String,
        default: moment().format("DD/MM/YYYY")
    },
    click: {
        type: Number
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