import security
from administration import *
from discord.ext import commands
from player import AudioPlayer
from dotenv import load_dotenv
from sirent.stat import get_time


def main():
    conf = get_conf()
    load_dotenv()
    client = commands.Bot(command_prefix=conf["prefix"])
    player = AudioPlayer(client)

    @client.event
    async def on_ready():
        start_log(client)
        print(client.user)
        print(client.guilds[0])

    @client.command(name="ping")
    async def _ping(ctx):
        if not security.has_permission(ctx):
            return
        write_cmd("ping")
        ping_ = client.latency
        ping = round(ping_ * 1000)
        write_log("info", "Ping: " + str(ping))
        await ctx.send(f"My ping is {ping}ms")

    @client.command(name="time")
    async def _time(ctx):
        if not security.has_permission(ctx):
            return
        write_cmd("time")
        await ctx.channel.send(get_time())

    client.run(conf["token"])


if __name__ == "__main__":
    main()
