from discord.ext import commands
from sirent.fs import *
from dotenv import load_dotenv
import sirent.player

conf = get_conf()

load_dotenv()
client = commands.Bot(command_prefix=conf["prefix"])


@client.event
async def on_ready():
    start_log(client)
    print(client.user)
    print(client.guilds[0])


@client.command(name="ping")
async def _ping(ctx):
    write_cmd("ping")
    ping_ = client.latency
    ping = round(ping_ * 1000)
    write_log("info", "Ping: " + str(ping))
    await ctx.send(f"My ping is {ping}ms")


@client.command(name="time")
async def _time(ctx):
    write_cmd("time")
    await ctx.channel.send(get_time())


player.init(client)

client.run(conf["token"])
