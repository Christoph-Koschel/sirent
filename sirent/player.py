import discord
from sirent.fs import *
import subprocess
import os

__root = os.path.dirname(os.getcwd())
v_obj = None

def init(client):
    @client.command(name="leave")
    async def _leave(ctx):
        global v_obj
        write_cmd("leave")
        write_log("info", "Leave channel")
        await ctx.channel.send("Leave channel")
        await v_obj.disconnect()

    @client.command(name="play")
    async def _play(ctx, url = ""):
        global v_obj
        write_cmd("play")
        if url == "":
            write_log("error", "The argument url is not given")
            return

        subprocess.call("ytdl.exe " + url + " " + os.path.dirname(os.getcwd()) + "\\assets\\music\\music.wav")
        while True:
            if os.path.exists("../assets/music/music.wav"):
                break

        channel = ctx.author.voice.channel
        v_obj = await channel.connect()
        player = discord.FFmpegPCMAudio(executable=__root + "\\assets\\ffmpeg\\ffmpeg.exe",
                                        source=__root + "\\assets\\music\\music.wav"
                                        )
        vc = discord.VoiceClient = discord.utils.get(client.voice_clients, guild=ctx.guild)
        vc.play(player)
