const {
    dafault: mongoose
} = require("mongoose");


let shortenerSchema = ({
    url: {
        type: String,
        require: true
    },
    name: String,
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