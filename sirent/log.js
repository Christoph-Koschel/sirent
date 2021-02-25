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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs = __importStar(require("fs"));
var write = global.console.log;
global.console.log = function (type) {
    if (type === void 0) { type = "log"; }
    var data = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        data[_i - 1] = arguments[_i];
    }
    for (var i in data) {
        writeLog(data[i], type);
        write(data[i]);
    }
};
function writeLog(data, type) {
    var date = new Date();
    new Intl.DateTimeFormat().resolvedOptions().timeZone;
    var dateString = date.getDay() + "-" + date.getMonth() + "-" + date.getFullYear();
    // @ts-ignore
    dateString += " " + date.getHours() + ":" + date.getMinutes() + "." + date.getSeconds() + " " + date.toString().match(/\(([A-Za-z\s].*)\)/)[1];
    var writeString = dateString + ":" + type + ":" + data + "\n";
    fs.writeFileSync(path_1.default.join(__dirname, "..", "assets", "log", "debug.log"), writeString, {
        flag: "a"
    });
}
//# sourceMappingURL=log.js.map