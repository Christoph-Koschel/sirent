import {Client, Message} from "discord.js";

interface IReadyCallback {
    (event: IReadyEvent): void
}

interface IReadyEvent {
    command(name: string, callback: ICommandCallback): void
}

interface ICommandCallback {
    (ctx: Message, client: ICommandEvent): void
}

export interface ICommandEvent {
    args: string[];
    bot: Client;
}

export class Event {
    private static eventList: any = {
        ready: []
    }

    public on(event: "ready", callback: IReadyCallback): void {
        Event.eventList[event].push(callback);
    }

    public static emit(event: "ready" | string, args: ICommandEvent | undefined = undefined, ctx: Message | undefined = undefined): void {
        switch (event) {
            case "ready":
                const readyEvent: IReadyEvent = {
                    command(name: string, callback) {
                        if (Event.eventList[name] === undefined) {
                            Event.eventList[name] = [];
                        }
                        Event.eventList[name].push(callback);
                    }
                }

                for (let i in Event.eventList.ready) {
                    Event.eventList.ready[i](readyEvent);
                }
                break;
            default:
                for (let i in Event.eventList[event]) {
                    Event.eventList[event][i](ctx, args);
                }
                break;
        }
    }
}
