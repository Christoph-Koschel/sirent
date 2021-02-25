import {Message, StreamDispatcher} from "discord.js";
import ytdl from "ytdl-core";
import path from "path";
import * as fs from "fs";

export class MusicPlayer {
    private player: StreamDispatcher | undefined;

    public async play(ctx: Message, url: string) {
        if (!ctx.member?.voice.channel) {
            await ctx.channel.send("Please join a voice channel");
            return;
        }
        let matches = url.match(/watch\?v=([a-zA-Z0-9\-_]+)/);
        if (matches) {
            if (fs.existsSync(path.join(__dirname, "..", "assets", "music", "music.mp3"))) {
                fs.unlinkSync(path.join(__dirname, "..", "assets", "music", "music.mp3"));
            }

            const connection = await ctx.member.voice.channel.join();
            this.player = connection.play(ytdl(url, {
                filter: "audioonly"
            }), {
                volume: 0.5
            });
        } else {
            await ctx.channel.send("Your URL is invalid");
        }
    }

    public async pause(ctx: Message) {
        if (this.player !== undefined) {
            await ctx.channel.send("Pausing the playing music");
            this.player.pause();
        } else {
            await ctx.channel.send("No song is playing");
        }
    }
}
