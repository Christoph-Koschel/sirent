import * as path from "path";
import * as fs from "fs";

const confPath: string = path.join(__dirname, "..", "assets", "conf", "conf.json")

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
    return JSON.parse(fs.readFileSync(confPath, "utf8"));
}

export function setConf(conf: IConfigFile) {
    fs.writeFileSync(confPath, JSON.stringify(conf, null, 4));
}
