import security
from sirent.stat import get_time
from sirent.administration import write_cmd, write_log


class Information:
    def __init__(self, client):
        @client.command(name="ping")
        async def _ping(ctx):
            if not await security.has_permission(ctx):
                return
            write_cmd("ping")
            ping_ = client.latency
            ping = round(ping_ * 1000)
            write_log("info", "Ping: " + str(ping))
            await ctx.send(f"My ping is {ping}ms")

        @client.command(name="time")
        async def _time(ctx):
            if not await security.has_permission(ctx):
                return
            write_cmd("time")
            await ctx.channel.send(get_time())
