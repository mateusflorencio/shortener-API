const Short = require("../model/shortener");


function generateCode() {
    let code = "";
    let possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; code.length < 6; i++) {
        code += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    let aux = verifyIfExist(code);
    if (!aux) {
        generateCode()
    }

    return code;
};

async function verifyIfExist(code) {
    let aux = await Short.findOne({
        urlCode: code
    });
    if (aux) {
        return true;
    } else {
        return false;
    }
};

module.exports = generateCode;