var SHA256 = require("crypto-js/sha256");
var Base64 = require("crypto-js/enc-base64");

function encodedFunc (str){
    return Buffer.from(SHA256(str).toString()).toString('base64',0,4);
}

module.exports = encodedFunc;
// Buffer.from(SHA256(str).toString()).toString('base64',0,4)