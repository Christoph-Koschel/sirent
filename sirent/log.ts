import path from "path";
import * as fs from "fs";

const write = global.console.log;
global.console.log = (data: any[], type: "log" | "error" | "info" = "log") => {
        writeLog(data, type);
        write(data);
}

function writeLog(data, type) {
    let date: Date = new Date();
    new Intl.DateTimeFormat().resolvedOptions().timeZone
    let dateString: string = date.getDay() + "-" + date.getMonth() + "-" + date.getFullYear();
    // @ts-ignore
    dateString += " " + date.getHours() + ":" + date.getMinutes() + "." + date.getSeconds() + " " + date.toString().match(/\(([A-Za-z\s].*)\)/)[1];
    let writeString: string = "[" + dateString + "]:" + type + ":" + data + "\n";
    fs.writeFileSync(path.join(__dirname, "..", "assets", "log", "debug.log"), writeString, {
        flag: "a"
    });
}

