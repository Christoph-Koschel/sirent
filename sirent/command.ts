import {Event} from "./event";
import {hasPermission, isModuleOn} from "./security";
import {MusicPlayer} from "./player";
import {getConf, IConfigFile, setConf} from "./settings";

console.log("Load command", "info");
const event = new Event();

event.on("ready", (event) => {
    let player: MusicPlayer = new MusicPlayer();

    event.command("time", (ctx, client) => {
        if (hasPermission(ctx)) {
            if (isModuleOn("information")) {
                const date: Date = new Date();
                let dateString: string = date.getDate().toString() + "." + date.getMonth().toString() + ".";
                dateString += date.getFullYear().toString() + " " + date.getHours() + ":" + date.getMinutes();

                ctx.channel.send(dateString);
            } else {
                ctx.channel.send("Module is not on");
            }
        } else {
            ctx.channel.send("You have no permission to do this");
        }
    });

    event.command("player", (ctx, client) => {
        if (client.args.length >= 1) {
            if (client.args[0] === "play") {
                if (client.args.length === 2) {
                    if (hasPermission(ctx)) {
                        if (isModuleOn("player")) {
                            player.play(ctx, client.args[1]);
                        } else {
                            ctx.channel.send("Module is not on");
                        }
                    } else {
                        ctx.channel.send("You have no permission to do this");
                    }
                } else {
                    ctx.channel.send("Need the parameter URL");
                }
            } else if (client.args[0] === "pause") {
                if (hasPermission(ctx)) {
                    if (isModuleOn("player")) {
                        player.pause(ctx);
                    } else {
                        ctx.channel.send("Module is not on");
                    }
                } else {
                    ctx.channel.send("You have no permission to do this");
                }
            } else if (client.args[0] === "loop") {
                if (client.args[1] === "true" || client.args[1] === "false") {
                    if (hasPermission(ctx)) {
                        if (isModuleOn("player")) {
                            player.setLoop((client.args[1] === "true")).then(() => {
                                ctx.channel.send("Loop mode updated");
                            });
                        } else {
                            ctx.channel.send("Module is not on");
                        }
                    } else {
                        ctx.channel.send("You have no permission to do this");
                    }
                } else {
                    ctx.channel.send("The parameter must be have the value \"true\" or \"false\"");
                }
            }
        }
    });

    event.command("permission", (ctx, client) => {
        const conf: IConfigFile = getConf();
        if (client.args.length >= 1) {
            if (client.args[0] === "set") {
                if (hasPermission(ctx, 3)) {
                    if (client.args[1] !== "0" && client.args[1] !== "1" &&
                        client.args[1] !== "2" && client.args[1] !== "3") {
                        ctx.channel.send("Select a level between 0 and 3");
                    } else {
                        let oldLevel = conf.security.level;
                        conf.security.level = parseInt(client.args[1]);
                        setConf(conf);
                        ctx.channel.send(`Permission (${oldLevel}) => (${conf.security.level})`);
                    }
                } else {
                    ctx.channel.send("You have no permission to do this");
                }
            } else if (client.args[0] === "get") {
                ctx.channel.send("The permission level is " + conf.security.level);
            }
        }
    });
});
