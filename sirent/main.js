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
var Settings = __importStar(require("./settings"));
var event_1 = require("./event");
var discord_js_1 = require("discord.js");
require("./log");
require("./command");
var client = new discord_js_1.Client();
var conf = Settings.getConf();
client.on("message", function (ctx) {
    if (!ctx.content.startsWith(conf.prefix) || ctx.author.bot)
        return;
    var args = ctx.content.slice(conf.prefix.length).trim().split(' ');
    // @ts-ignore
    var command = args.shift().toLowerCase();
    console.log(args);
    var argTemp = {
        args: args,
        bot: client
    };
    event_1.Event.emit(command, argTemp, ctx);
});
client.on("ready", function () {
    console.log("Bot started...");
    client.guilds.cache.forEach(function (guild) {
        console.log("info", guild.name + " | " + guild.id);
    });
    event_1.Event.emit("ready");
});
client.login(conf.token);
//# sourceMappingURL=main.js.map