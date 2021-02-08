from discord.ext import commands
from dotenv import load_dotenv

from sirent import security
from sirent.administration import get_conf, start_log, write_cmd, write_log
from sirent.player import AudioPlayer
from sirent.information import Information
from sirent.stat import get_time


def main():
    conf = get_conf()
    load_dotenv()
    client = commands.Bot(command_prefix=conf["prefix"])
    AudioPlayer(client)
    Information(client)

    @client.event
    async def on_ready():
        start_log(client)
        print(client.user)
        print(client.guilds[0])

    client.run(conf["token"])


if __name__ == "__main__":
    main()
