from administration import get_conf


async def has_permission(ctx, level="", callback=True):
    current_id = ctx.message.author.id
    conf = get_conf()
    if level == "":
        permission_level = conf["security"]["level"]
    else:
        permission_level = level

    def is_dev():
        return "dev" in [y.name.lower() for y in ctx.message.author.roles]

    def is_intern():
        return "intern" in [y.name.lower() for y in ctx.message.author.roles]

    def is_security():
        permission_ids = conf["security"]["id"]
        for permission_id in permission_ids:
            if str(permission_id) == str(current_id):
                return True
        return False

    if permission_level == 0:
        return True
    elif permission_level == 1:
        if is_dev() or is_intern() or is_security():
            return True
    elif permission_level == 2:
        if is_dev() or is_security():
            return True
    elif permission_level == 3:
        if is_security():
            return True
    if callback:
        await ctx.channel.send(f'The permission level ({conf["security"]["level"]}) is to high')
    return False
