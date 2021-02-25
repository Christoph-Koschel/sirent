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
exports.hasPermission = exports.isModuleOn = void 0;
var Settings = __importStar(require("./settings"));
var roles_1 = require("./roles");
function isModuleOn(module) {
    var conf = Settings.getConf();
    switch (module) {
        case "information":
            return conf.security.module.information;
        case "player":
            return conf.security.module.player;
    }
}
exports.isModuleOn = isModuleOn;
function hasPermission(ctx, level) {
    if (level === void 0) { level = undefined; }
    var conf = Settings.getConf();
    var id = ctx.author.id;
    function isDev() {
        // @ts-ignore
        return !ctx.member.roles.cache.some(function (role) { return role.id.toString() === roles_1.Roles.dev; });
    }
    function isMod() {
        // @ts-ignore
        return !ctx.member.roles.cache.some(function (role) { return role.id.toString() === roles_1.Roles.mod; });
    }
    function isIntern() {
        // @ts-ignore
        return !ctx.member.roles.cache.some(function (role) { return role.id.toString() === roles_1.Roles.intern; });
    }
    function isSecurityID() {
        return (conf.security.id.indexOf(id) !== -1);
    }
    switch ((level === undefined) ? conf.security.level : level) {
        case 0:
            return true;
        case 1:
            // @ts-ignore
            return isIntern() || isDev() || isMod() || isSecurityID();
        case 2:
            return isDev() || isSecurityID();
        case 3:
            return isSecurityID();
        default:
            return false;
    }
}
exports.hasPermission = hasPermission;
//# sourceMappingURL=security.js.map