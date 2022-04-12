const {
    default: mongoose
} = require("mongoose");

const bcrypt = require("bcrypt");

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});


userSchema.pre("save", function (next) {
    if (this.isNew || this.isModified("password")) {
        const document = this;
        bcrypt.hash(document.password, 10, (err, hashedpassword) => {
            if (err) {
                next(err);
            } else {
                document.password = hashedpassword;
                next();
            };
        });
    };
});

userSchema.methods.isCorrectPassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, same) {
        if (err) {
            callback(err);
        } else {
            callback(err, same)
        }

    })
}


module.exports = mongoose.model("User", userSchema);