import discord
import subprocess
import os
import security
import administration


class AudioPlayer:
    def __init__(self, client):
        self.vc = None

        @client.command(name="stop")
        async def _stop(ctx):
            if not await security.has_permission(ctx):
                return
            administration.write_cmd("leave")
            await self.stop(ctx)

        @client.command(name="play")
        async def _play(ctx, url=""):
            if not await security.has_permission(ctx):
                return
            administration.write_cmd("play")
            if url == "":
                administration.write_log("error", "The argument url is not given")
                return
            await self.play(ctx, url)

        @client.command(name="pause")
        async def _pause(ctx):
            if not await security.has_permission(ctx):
                return
            administration.write_cmd("pause")
            await self.pause(ctx)

        @client.command(name="resume")
        async def _resume(ctx):
            if not await security.has_permission(ctx):
                return
            administration.write_cmd("resume")
            await self.resume(ctx)

    async def stop(self, ctx):
        administration.write_log("info", "Leave channel")
        await ctx.channel.send("Leave channel")
        await self.vc.disconnect()

    async def play(self, ctx, url):
        administration.write_log("info", f"Play from url: {url}")
        await ctx.channel.send("Play music")
        administration.write_log("log", "Play music")
        subprocess.call(os.path.join(os.path.dirname(__file__), "assets", "ytdl", "ytdl.exe") + " " +
                        url + " " + os.path.join(os.path.dirname(__file__), "assets", "music", "music.wav"))
        while True:
            if os.path.exists(os.path.join(os.path.dirname(__file__), "assets", "music", "music.wav")):
                break

        channel = ctx.author.voice.channel
        self.vc = await channel.connect()
        if self.vc is not None:
            if self.vc.is_playing():
                self.vc.stop()
        self.vc.play(discord.FFmpegPCMAudio(executable=os.path.join(os.path.dirname(__file__), "assets", "ffmpeg", "ffmpeg.exe"),
                                            source=os.path.join(os.path.dirname(__file__), "assets", "music", "music.wav")
                                            ))
        self.vc.source = discord.PCMVolumeTransformer(self.vc.source)
        self.vc.source.volume = 0.5

    async def pause(self, ctx):
        if not self.vc:
            administration.write_log("error", "Can not pause because no url is playing")
            await ctx.channel.send("Can not pause because no url is playing")
            return

        administration.write_log("error", "Pausing the played url")
        await ctx.channel.send("Pausing the music")
        self.vc.pause()

    async def resume(self, ctx):
        if not self.vc:
            administration.write_log("error", "Can not resume playing the music because not url is playing")
            await ctx.channel.send("Can not resume playing the music because not url is playing")
            return
        self.vc.resume()
