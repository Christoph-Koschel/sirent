from administration import *
import discord
import subprocess
import os
import security


class AudioPlayer:
    def __init__(self, client):
        self.vc = None

        @client.command(name="stop")
        async def _stop(ctx):
            if not security.has_permission(ctx):
                return
            write_cmd("leave")
            await self.stop(ctx)

        @client.command(name="play")
        async def _play(ctx, url=""):
            if not security.has_permission(ctx):
                return
            write_cmd("play")
            if url == "":
                write_log("error", "The argument url is not given")
                return
            await self.play(ctx, url)

        @client.command(name="pause")
        async def _pause(ctx):
            if not security.has_permission(ctx):
                return
            write_cmd("pause")
            await self.pause(ctx)

        @client.command(name="resume")
        async def _resume(ctx):
            if not security.has_permission(ctx):
                return
            write_cmd("resume")
            await self.resume(ctx)

    async def stop(self, ctx):
        write_log("info", "Leave channel")
        await ctx.channel.send("Leave channel")
        await self.vc.disconnect()

    async def play(self, ctx, url):
        write_log("info", f"Play from url: {url}")
        subprocess.call(os.path.dirname(os.getcwd()) + "\\assets\\ytdl\\ytdl.exe " +
                        url + " " + os.path.dirname(os.getcwd()) + "\\assets\\music\\music.wav")
        while True:
            if os.path.exists("../assets/music/music.wav"):
                break

        channel = ctx.author.voice.channel
        self.vc = await channel.connect()
        if self.vc is not None:
            if self.vc.is_playing():
                self.vc.stop()
        self.vc.play(discord.FFmpegPCMAudio(executable=os.path.dirname(os.getcwd()) + "\\assets\\ffmpeg\\ffmpeg.exe",
                                            source=os.path.dirname(os.getcwd()) + "\\assets\\music\\music.wav"
                                            ))
        self.vc.source = discord.PCMVolumeTransformer(self.vc.source)
        self.vc.source.volume = 0.5

    async def pause(self, ctx):
        if not self.vc:
            write_log("error", "Can not pause because no url is playing")
            await ctx.channel.send("Can not pause because no url is playing")
            return

        write_log("error", "Pausing the played url")
        await ctx.channel.send("Pausing the music")
        self.vc.pause()

    async def resume(self, ctx):
        if not self.vc:
            write_log("error", "Can not resume playing the music because not url is playing")
            await ctx.channel.send("Can not resume playing the music because not url is playing")
            return
        self.vc.resume()
