"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setConf = exports.getConf = void 0;
var path = __importStar(require("path"));
var fs = __importStar(require("fs"));
var crypto_1 = require("./crypto");
var confPath = path.join(__dirname, "..", "assets", "conf", "conf.hash");
function getConf() {
    var hash = fs.readFileSync(confPath, "utf-8");
    hash = hash.replace(/\n/gi, "");
    if (process.env.HASH_PASSWORD === undefined) {
        console.log("ENV HASH_PASSWORD not exists");
        process.exit(0);
    }
    return JSON.parse(crypto_1.Hashed.decode(hash, process.env.HASH_PASSWORD));
}
exports.getConf = getConf;
function setConf(conf) {
    if (process.env.HASH_PASSWORD === undefined) {
        console.log("ENV HASH_PASSWORD not exists");
        process.exit(0);
    }
    var hash = crypto_1.Hashed.encode(JSON.stringify(conf, null, 4), process.env.HASH_PASSWORD);
    fs.writeFileSync(confPath, hash);
}
exports.setConf = setConf;
//# sourceMappingURL=settings.js.map