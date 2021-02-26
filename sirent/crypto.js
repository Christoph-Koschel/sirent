"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hashed = void 0;
var crypto_1 = __importDefault(require("crypto"));
var Hashed;
(function (Hashed) {
    function encode(text, password) {
        var key = crypto_1.default.createCipher('aes-128-cbc', password);
        var encodedString = key.update(text, 'utf8', 'hex');
        encodedString += key.final('hex');
        return encodedString;
    }
    Hashed.encode = encode;
    function decode(hash, password) {
        var key = crypto_1.default.createDecipher('aes-128-cbc', password);
        var decodedString = key.update(hash, 'hex', 'utf8');
        decodedString += key.final('utf8');
        return decodedString;
    }
    Hashed.decode = decode;
})(Hashed = exports.Hashed || (exports.Hashed = {}));
//# sourceMappingURL=crypto.js.map