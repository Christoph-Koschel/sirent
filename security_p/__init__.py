def has_permission(ctx):
    if str(ctx.author).split("#")[1] == "4128" or str(ctx.author).split("#")[1] == "7923":
        return False
    else:
        return True
