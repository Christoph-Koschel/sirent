"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_1 = require("./event");
var security_1 = require("./security");
var player_1 = require("./player");
var settings_1 = require("./settings");
console.log("Load command");
var event = new event_1.Event();
event.on("ready", function (event) {
    var player = new player_1.MusicPlayer();
    event.command("time", function (ctx, client) {
        if (security_1.hasPermission(ctx)) {
            if (security_1.isModuleOn("information")) {
                var date = new Date();
                var dateString = date.getDate().toString() + "." + date.getMonth().toString() + ".";
                dateString += date.getFullYear().toString() + " " + date.getHours() + ":" + date.getMinutes();
                ctx.channel.send(dateString);
            }
            else {
                ctx.channel.send("Module is not on");
            }
        }
        else {
            ctx.channel.send("You have no permission to do this");
        }
    });
    event.command("player", function (ctx, client) {
        if (client.args.length >= 1) {
            if (client.args[0] === "play") {
                if (client.args.length === 2) {
                    if (security_1.hasPermission(ctx)) {
                        if (security_1.isModuleOn("player")) {
                            player.play(ctx, client.args[1]);
                        }
                        else {
                            ctx.channel.send("Module is not on");
                        }
                    }
                    else {
                        ctx.channel.send("You have no permission to do this");
                    }
                }
            }
            else if (client.args[0] === "pause") {
                if (security_1.hasPermission(ctx)) {
                    if (security_1.isModuleOn("player")) {
                        player.pause(ctx);
                    }
                    else {
                        ctx.channel.send("Module is not on");
                    }
                }
                else {
                    ctx.channel.send("You have no permission to do this");
                }
            }
        }
    });
    event.command("permission", function (ctx, client) {
        var conf = settings_1.getConf();
        if (client.args.length >= 1) {
            if (client.args[0] === "set") {
                if (security_1.hasPermission(ctx, 3)) {
                    if (client.args[1] !== "0" && client.args[1] !== "1" &&
                        client.args[1] !== "2" && client.args[1] !== "3") {
                        ctx.channel.send("Select a level between 0 and 3");
                    }
                    else {
                        var oldLevel = conf.security.level;
                        conf.security.level = parseInt(client.args[1]);
                        settings_1.setConf(conf);
                        ctx.channel.send("Permission (" + oldLevel + ") => (" + conf.security.level + ")");
                    }
                }
                else {
                    ctx.channel.send("You have no permission to do this");
                }
            }
            else if (client.args[0] === "get") {
                ctx.channel.send("The permission level is " + conf.security.level);
            }
        }
    });
});
//# sourceMappingURL=command.js.map