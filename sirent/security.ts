import {Message} from "discord.js";
import * as Settings from "./settings";
import {Roles} from "./roles";
import {log} from "util";

export function isModuleOn(module: "information" | "player"): boolean {
    const conf: Settings.IConfigFile = Settings.getConf();
    switch (module) {
        case "information":
            return conf.security.module.information;
        case "player":
            return conf.security.module.player;
    }
}

export function hasPermission(ctx: Message, level: number | undefined = undefined): boolean {
    const conf: Settings.IConfigFile = Settings.getConf();
    let id: string = ctx.author.id;

    function isDev(): boolean {
        // @ts-ignore
        return !ctx.member.roles.cache.some((role) => role.id.toString() === Roles.dev);
    }

    function isMod(): boolean {
        // @ts-ignore
        return !ctx.member.roles.cache.some((role) => role.id.toString() === Roles.mod);
    }

    function isIntern(): boolean {
        // @ts-ignore
        return !ctx.member.roles.cache.some((role) => role.id.toString() === Roles.intern);
    }

    function isSecurityID(): boolean {
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
