import discord
from sirent.fs import *
import subprocess
import os
import security_p

__root = os.path.dirname(os.getcwd())
v_obj = None


def init(client):
    @client.command(name="leave")
    async def _leave(ctx):
        if not security_p.has_permission(ctx):
            return
        global v_obj
        write_cmd("leave")
        write_log("info", "Leave channel")
        await ctx.channel.send("Leave channel")
        await v_obj.disconnect()

    @client.command(name="play")
    async def _play(ctx, url=""):
        if not security_p.has_permission(ctx):
            return
        global v_obj
        write_cmd("play")
        if url == "":
            write_log("error", "The argument url is not given")
            return
        write_log("info", f"Play from url: {url}")
        subprocess.call(os.path.dirname(os.getcwd()) + "\\assets\\ytdl\\ytdl.exe " +
                        url + " " + os.path.dirname(os.getcwd()) + "\\assets\\music\\music.wav")
        while True:
            if os.path.exists("../assets/music/music.wav"):
                break

        channel = ctx.author.voice.channel
        v_obj = await channel.connect()
        if v_obj is not None:
            if v_obj.is_playing():
                v_obj.stop()
        v_obj.play(discord.FFmpegPCMAudio(executable=__root + "\\assets\\ffmpeg\\ffmpeg.exe",
                                          source=__root + "\\assets\\music\\music.wav"
                                          ))
        v_obj.source = discord.PCMVolumeTransformer(v_obj.source)
        v_obj.source.volume = 0.5

    @client.command(name="pause")
    async def _pause(ctx):
        if not security_p.has_permission(ctx):
            return
        write_cmd("pause")
        global v_obj
        if not v_obj:
            write_log("error", "Can not pause because no url is playing")
            ctx.channel.send("Can not pause because no url is playing")
            return

        write_log("error", "Pausing the played url")
        ctx.channel.send("Pausing the music")
        v_obj.pause()

    @client.command(name="resume")
    async def _resume(ctx):
        if not security_p.has_permission(ctx):
            return
        global v_obj
        if not v_obj:
            write_log("error", "Can not resume playing the music because not url is playing")
            ctx.channel.send("Can not resume playing the music because not url is playing")
            return
        v_obj.resume()