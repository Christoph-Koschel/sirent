from sirent.administration import get_conf


def has_permission(ctx):
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

    current_id = ctx.message.author.id
    conf = get_conf()

    if conf["security"]["level"] == 0:
        return True
    elif conf["security"]["level"] == 1:
        if is_dev() or is_intern() or is_security():
            return True
    elif conf["security"]["level"] == 2:
        if is_dev() or is_security():
            return True
    elif conf["security"]["level"] == 3:
        if is_security():
            return True
    else:
        return False
