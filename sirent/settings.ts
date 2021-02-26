import * as path from "path";
import * as fs from "fs";
import {Hashed} from "./crypto";
import has = Reflect.has;


const confPath: string = path.join(__dirname, "..", "assets", "conf", "conf.hash");

export interface IConfigFile {
    prefix: string;
    version: string;
    release: string;
    security: {
        id: string[];
        level: number;
        module: {
            information: boolean;
            player: boolean;
        }
    };
    functions: string[];
    token: string;
}

export function getConf(): IConfigFile {
    let hash = fs.readFileSync(confPath, "utf-8");
    hash = hash.replace(/\n/gi, "");
    if (process.env.HASH_PASSWORD === undefined) {
        console.log("ENV HASH_PASSWORD not exists")
        process.exit(0);
    }
    return JSON.parse(Hashed.decode(hash, process.env.HASH_PASSWORD));
}

export function setConf(conf: IConfigFile) {
    if (process.env.HASH_PASSWORD === undefined) {
        console.log("ENV HASH_PASSWORD not exists")
        process.exit(0);
    }
    let hash = Hashed.encode(JSON.stringify(conf, null, 4), process.env.HASH_PASSWORD);
    fs.writeFileSync(confPath, hash);
}
