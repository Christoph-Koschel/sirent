import * as Settings from "./settings";
import {Event,ICommandEvent} from "./event";

import {Client} from "discord.js";
import * as dotenv from "dotenv";

import "./log";
import "./command";


dotenv.config();
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
    client.guilds.cache.forEach(guild => {
        console.log(`${guild.name} | ${guild.id}`);
    })
    Event.emit("ready");
});

client.login(conf.token);
