import json

from sirent import get_time


def get_conf():
    with open("../assets/conf/conf.json") as file:
        return json.loads(file.read())


def start_log(client):
    with open("../assets/log/debug.log", mode="a") as log:
        log.write("---------" + str(get_time()) + "---------\n")
        log.write("[{0}]::Info->Start bot...\n".format(get_time()))
        log.write("[{0}]::Info->Name tag:{1}\n".format(get_time(), client.user))
        log.close()


def write_cmd(cmd):
    with open("../assets/log/debug.log", mode="a") as log:
        log.write("[{0}]::Info->Run command: {1}\n".format(get_time(), cmd))
        log.close()


def write_log(flag, text):
    if flag != "info" and flag != "error":
        return
    else:
        with open("../assets/log/debug.log", mode="a") as log:
            if flag == "info":
                flag = "Info"
            elif flag == "error":
                flag = "Error"

            log.write("[{0}]::{1}->{2}\n".format(get_time(), flag, text))
            log.close()
