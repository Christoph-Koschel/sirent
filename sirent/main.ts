import * as Settings from "./settings";
import {Event,ICommandEvent} from "./event";
import "./command";
import {Client, Emoji} from "discord.js";

const client: Client = new Client();
const conf: Settings.IConfigFile = Settings.getConf();


client.on("message",(ctx) => {
    if (!ctx.content.startsWith(conf.prefix) || ctx.author.bot) return;

    const args = ctx.content.slice(conf.prefix.length).trim().split(' ');
    // @ts-ignore
    const command = args.shift().toLowerCase();
    console.log(args);
    const argTemp: ICommandEvent = {
        args: args,
        bot: client
    }
    Event.emit(command, argTemp, ctx);
});

client.on("ready",() => {
    console.log("Bot started...");
    Event.emit("ready");
});

client.login(conf.token);
