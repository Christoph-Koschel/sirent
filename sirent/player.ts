import {Message, StreamDispatcher} from "discord.js";
import ytdl from "ytdl-core";
import path from "path";
import * as fs from "fs";

export class MusicPlayer {
    private player: StreamDispatcher | undefined;
    private playlist: string[];
    private playlistStep: number;
    private playlistLoop: boolean;

    constructor() {
        this.playlist = [];
        this.playlistStep = -1;
        this.playlistLoop = false;
    }

    public async setLoop(loop: boolean): Promise<void> {
        this.playlistLoop = loop;
    }

    public async getLoop(): Promise<boolean> {
        return this.playlistLoop;
    }

    public async addPlaylistItem(ctx: Message, url: string): Promise<void> {
        if (!ctx.member?.voice.channel) {
            await ctx.channel.send("Please join a voice channel");
            return;
        }
        let matches = url.match(/watch\?v=([a-zA-Z0-9\-_]+)/);
        if (matches) {
            this.playlist.push(url);
        } else {
            await ctx.channel.send("Your URL is invalid");
        }
    }

    public async play(ctx: Message, url: string): Promise<void> {
        if (!ctx.member?.voice.channel) {
            await ctx.channel.send("Please join a voice channel");
            return;
        }
        let matches = url.match(/watch\?v=([a-zA-Z0-9\-_]+)/);
        if (matches) {
            const connection = await ctx.member.voice.channel.join();
            this.player = connection.play(ytdl(url, {
                filter: "audioonly"
            }), {
                volume: 0.5
            });

            this.player.on("finish",() => {
                if (this.playlistStep === this.playlist.length -1) {
                    if (this.playlistLoop) {
                        this.playlistStep = 0;
                        this.play(ctx, this.playlist[this.playlistStep]);
                    }
                } else {
                    this.playlistStep++;
                    this.play(ctx, this.playlist[this.playlistStep]);
                }
            });
        } else {
            await ctx.channel.send("Your URL is invalid");
        }
    }

    public async pause(ctx: Message): Promise<void> {
        if (this.player !== undefined) {
            await ctx.channel.send("Pausing the playing music");
            this.player.pause();
        } else {
            await ctx.channel.send("No song is playing");
        }
    }
}
