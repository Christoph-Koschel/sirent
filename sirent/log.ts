import path from "path";
import * as fs from "fs";

const write = global.console.log;
global.console.log = (type: "log" | "error" | "info" = "log", ...data: any[]) => {
    for (let i in data) {
        writeLog(data[i], type);
        write(data[i]);
    }
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

