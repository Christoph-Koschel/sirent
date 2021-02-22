from discord.ext import commands
from dotenv import load_dotenv

import security
from administration import get_conf, start_log, write_cmd, write_log, set_conf
from player import AudioPlayer
from information import Information


def main():
    conf = get_conf()
    load_dotenv()
    client = commands.Bot(command_prefix=conf["prefix"])
    if conf["security"]["module"]["player"]:
        AudioPlayer(client)
    if conf["security"]["module"]["information"]:
        Information(client)

    @client.command(name="permission")
    async def _permission(ctx, level=""):
        conf = get_conf()
        write_cmd("permission")
        if level == "get":
            await ctx.channel.send(f'Current permission level: {conf["security"]["level"]}')
            write_log("info", f'Current permission level: {conf["security"]["level"]}')
            return
        if not await security.has_permission(ctx, 3, False):
            await ctx.channel.send("You have no permission for this command")
            write_log("error", "P:(" + str(ctx.message.author) +
                      ")>>(" + str(ctx.message.author.id) +
                      ") has no permission for this command"
                      )
            return
        if level == "":
            await ctx.channel.send("Need argument: level")
            write_log("error", "Need argument: level")
            return

        old_level = conf["security"]["level"]
        conf["security"]["level"] = int(level)
        set_conf(conf)
        await ctx.channel.send(f"Set permission level from ({old_level}) => ({level})")
        write_log("info", f"Set permission level from ({old_level}) => ({level})")

    @client.event
    async def on_ready():
        start_log(client)
        print(client.user)
        print(client.guilds[0])

    client.run(conf["token"])


if __name__ == "__main__":
    main()
