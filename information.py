import security
from stat import get_time, get_ping
from administration import write_cmd, write_log, get_conf


class Information:
    def __init__(self, client):
        @client.command(name="ping")
        async def _ping(ctx):
            if not await security.has_permission(ctx):
                return
            write_cmd("ping")
            ping = get_ping(client)
            write_log("info", "Ping: " + str(ping))
            await ctx.send(f"My ping is {ping}ms")

        @client.command(name="time")
        async def _time(ctx):
            if not await security.has_permission(ctx):
                return
            write_cmd("time")
            await ctx.channel.send(get_time())

        @client.command(name="stat")
        async def _stat(ctx, spec=""):
            if not await security.has_permission(ctx):
                return
            write_cmd("stat")
            conf = get_conf()
            callback = ""
            if spec == "":
                callback += "**Stats**\n\n"

            if spec == "" or spec == "g":
                callback += "General stats:\n"
                callback += " - Name: " + str(client.user).split("#")[0] + "\n"
                callback += " - ID: #" + str(client.user).split("#")[1] + "\n"
                callback += " - Ping: " + str(get_ping(client))
                callback += "\n\n"

            if spec == "" or spec == "c":
                callback += "Code stats: \n"
                callback += " - Version: " + str(conf["version"]) + "\n"
                callback += " - Version release: " + str(conf["release"])
                callback += "\n\n"

            if spec == "" or spec == "m":
                callback += "Module stats: \n"
                callback += " - Music player: "
                if conf["security"]["module"]["player"]:
                    callback += "on\n"
                else:
                    callback += "off\n"
                callback += " - Information: "
                if conf["security"]["module"]["information"]:
                    callback += "on\n"
                else:
                    callback += "off\n"
                no_spin = True
                callback += " - Functions: ["
                for security_id in conf["functions"]:
                    no_spin = False
                    callback += "\n\t\t" + security_id
                if not no_spin:
                    callback += "\n"
                callback += "]"
                callback += "\n\n"

            if spec == "" or spec == "s":
                callback += "Security stats: \n"
                callback += " - Permission level: " + str(conf["security"]["level"]) + "\n"
                callback += " - Security ids: ["
                no_spin = True
                for security_id in conf["security"]["id"]:
                    no_spin = False
                    callback += "\n\t\t" + security_id
                if not no_spin:
                    callback += "\n"
                callback += "]"
                callback += "\n\n"

            callback += "\n"
            callback += "*Product from **HexaStudio**\n"
            callback += "\t HexaStudio (c) 2020*"

            await ctx.channel.send(callback)
