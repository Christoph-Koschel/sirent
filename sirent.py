from discord.ext import commands
from dotenv import load_dotenv

import security
import player
import information
import administration
import os

def main():
    for (root, dirs, files) in os.walk(os.getcwd(), topdown=False):
        print("The root is: ")
        print(root)
        print("The directories are: ")
        print(dirs)
        print("The files are: ")
        print(files)
        print('--------------------------------')

    conf = administration.get_conf()
    load_dotenv()
    client = commands.Bot(command_prefix=conf["prefix"])
    if conf["security"]["module"]["player"]:
        player.AudioPlayer(client)
    if conf["security"]["module"]["information"]:
        information.Information(client)

    @client.command(name="permission")
    async def _permission(ctx, level=""):
        conf = administration.get_conf()
        administration.write_cmd("permission")
        if level == "get":
            await ctx.channel.send(f'Current permission level: {conf["security"]["level"]}')
            administration.write_log("info", f'Current permission level: {conf["security"]["level"]}')
            return
        if not await security.has_permission(ctx, 3, False):
            await ctx.channel.send("You have no permission for this command")
            administration.write_log("error", "P:(" + str(ctx.message.author) +
                      ")>>(" + str(ctx.message.author.id) +
                      ") has no permission for this command"
                      )
            return
        if level == "":
            await ctx.channel.send("Need argument: level")
            administration.write_log("error", "Need argument: level")
            return

        old_level = conf["security"]["level"]
        conf["security"]["level"] = int(level)
        administration.set_conf(conf)
        await ctx.channel.send(f"Set permission level from ({old_level}) => ({level})")
        administration.write_log("info", f"Set permission level from ({old_level}) => ({level})")

    @client.event
    async def on_ready():
        administration.start_log(client)
        print(client.user)
        print(client.guilds[0])

    client.run(conf["token"])


if __name__ == "__main__":
    main()
